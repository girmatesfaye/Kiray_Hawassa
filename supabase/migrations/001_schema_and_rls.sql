-- 001_schema_and_rls.sql
-- Base schema and Security policies for Kiray Hawassa

-- 1. Profiles Table extensions
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS fayida_id TEXT,
  ADD COLUMN IF NOT EXISTS occupation TEXT,
  ADD COLUMN IF NOT EXISTS subcity TEXT,
  ADD COLUMN IF NOT EXISTS id_photo_url TEXT;

-- Prevent client-side updates from escalating role to 'staff'
CREATE OR REPLACE FUNCTION check_profile_role_update()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role = 'staff' AND (OLD.role IS DISTINCT FROM 'staff') THEN
    IF current_setting('request.jwt.claim.role', true) IS DISTINCT FROM 'service_role' THEN
      RAISE EXCEPTION 'Role staff can only be granted by service_role';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS tr_check_profile_role_update ON profiles;
CREATE TRIGGER tr_check_profile_role_update
  BEFORE INSERT OR UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION check_profile_role_update();

-- 2. Listings Table
CREATE TABLE IF NOT EXISTS listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  landlord_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  price NUMERIC NOT NULL,
  bedrooms INT,
  bathrooms INT,
  area_sqm NUMERIC,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'rented_out')),
  image_url TEXT,
  amenities TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Links Table (Deal Closed)
CREATE TABLE IF NOT EXISTS links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  landlord_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  staff_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  commission_amount NUMERIC NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Payouts Table
CREATE TABLE IF NOT EXISTS payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  link_id UUID NOT NULL REFERENCES links(id) ON DELETE CASCADE,
  staff_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  paid_at TIMESTAMPTZ
);

-- 5. Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE links ENABLE ROW LEVEL SECURITY;
ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Public & RLS Policies
-- Profiles: Users read all public profiles, update own profile
CREATE POLICY "Public profiles are readable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Listings: Readable by all, manageable by owner landlord or staff
CREATE POLICY "Listings readable by everyone" ON listings FOR SELECT USING (true);
CREATE POLICY "Landlords can create listings" ON listings FOR INSERT WITH CHECK (auth.uid() = landlord_id);
CREATE POLICY "Landlords can update own listings" ON listings FOR UPDATE USING (auth.uid() = landlord_id);

-- Contact Visibility Rule (Read-time check)
-- Phone numbers of landlord/tenant visible if link exists
CREATE OR REPLACE VIEW visible_contacts AS
SELECT
  p.id as target_user_id,
  p.full_name,
  CASE
    WHEN auth.uid() = p.id THEN p.phone
    WHEN EXISTS (
      SELECT 1 FROM links l
      WHERE (l.tenant_id = auth.uid() AND l.landlord_id = p.id)
         OR (l.landlord_id = auth.uid() AND l.tenant_id = p.id)
    ) THEN p.phone
    WHEN (SELECT role FROM profiles WHERE id = auth.uid()) = 'staff' THEN p.phone
    ELSE NULL
  END AS revealed_phone
FROM profiles p;
