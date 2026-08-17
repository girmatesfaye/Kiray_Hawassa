-- 002_close_deal_function.sql
-- Atomic Close Deal transaction function

CREATE OR REPLACE FUNCTION close_deal(
  p_lead_id UUID,
  p_tenant_id UUID,
  p_landlord_id UUID,
  p_listing_id UUID,
  p_staff_id UUID,
  p_commission_amount NUMERIC,
  p_interest_id UUID DEFAULT NULL
) RETURNS JSONB AS $$
DECLARE
  v_link_id UUID;
  v_payout_id UUID;
  v_result JSONB;
BEGIN
  -- 1. Insert links row
  INSERT INTO links (tenant_id, landlord_id, listing_id, staff_id, commission_amount)
  VALUES (p_tenant_id, p_landlord_id, p_listing_id, p_staff_id, p_commission_amount)
  RETURNING id INTO v_link_id;

  -- 2. Update listing status to 'rented_out'
  UPDATE listings
  SET status = 'rented_out'
  WHERE id = p_listing_id;

  -- 3. Insert payouts row as 'pending'
  INSERT INTO payouts (link_id, staff_id, amount, status)
  VALUES (v_link_id, p_staff_id, p_commission_amount, 'pending')
  RETURNING id INTO v_payout_id;

  -- 4. Update lead status to 'linked'
  UPDATE leads
  SET status = 'linked', updated_at = now()
  WHERE id = p_lead_id;

  -- 4b. Task brief #2 moved active tenant inquiries to interests.
  IF p_interest_id IS NOT NULL THEN
    UPDATE interests
    SET status = 'linked', updated_at = now()
    WHERE id = p_interest_id;
  END IF;

  -- 5. Trigger notifications for tenant & landlord
  INSERT INTO notifications (user_id, title, body)
  VALUES
    (p_tenant_id, 'Deal Closed! 🎉', 'Your rental deal has been finalized. Landlord contact info is now unlocked.'),
    (p_landlord_id, 'Property Rented Out! 🔑', 'Your property deal has been closed by your assigned connector.');

  v_result := jsonb_build_object(
    'success', true,
    'link_id', v_link_id,
    'payout_id', v_payout_id
  );

  RETURN v_result;
EXCEPTION WHEN OTHERS THEN
  RAISE EXCEPTION 'close_deal transaction failed: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
