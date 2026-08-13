// supabase/functions/close-deal/index.ts
// Supabase Edge Function to safely trigger the atomic close_deal transaction

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { lead_id, tenant_id, landlord_id, listing_id, staff_id, commission_amount } = await req.json();

    if (!lead_id || !tenant_id || !landlord_id || !listing_id || !staff_id || !commission_amount) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters for close_deal' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data, error } = await supabaseClient.rpc('close_deal', {
      p_lead_id: lead_id,
      p_tenant_id: tenant_id,
      p_landlord_id: landlord_id,
      p_listing_id: listing_id,
      p_staff_id: staff_id,
      p_commission_amount: commission_amount,
    });

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
