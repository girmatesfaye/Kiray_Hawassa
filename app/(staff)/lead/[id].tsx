import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import HeaderBar from '@/components/ui/HeaderBar';
import { getStaffLeads, updateLeadStatus } from '@/lib/supabase/api';
import { Lead } from '@/lib/supabase/types';
import { MOCK_SCHEDULES } from '@/lib/mock/data';

function formatTimestamp(ts: string): string {
  try {
    const d = new Date(ts);
    return d.toLocaleString('en-US', {
      month: 'short', day: 'numeric',
      hour: 'numeric', minute: '2-digit', hour12: true,
    });
  } catch {
    return ts;
  }
}

export default function StaffLeadDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const leadId = (id as string) || '1';

  const [lead, setLead] = useState<Lead | null>(null);
  const [notFound, setNotFound] = useState(false);

  const fetchLead = async () => {
    const leads = await getStaffLeads('All');
    const match = leads.find((l) => l.id === leadId);
    if (match === undefined) {
      setLead(null);
      setNotFound(true);
    } else {
      setLead(match);
      setNotFound(false);
    }
  };

  useEffect(() => {
    fetchLead();
  }, [leadId]);

  const isDropped = lead?.status === 'not_selected';
  const isLinked = lead?.status === 'linked';

  // Task 5: Confirmation dialog required before dropping a lead
  const handleMarkNotInterested = () => {
    Alert.alert(
      'Confirm Drop Lead',
      'Are you sure you want to mark this tenant lead as Not Interested? The lead will move under the Dropped filter.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, Drop Lead',
          style: 'destructive',
          onPress: async () => {
            await updateLeadStatus(leadId, 'not_selected');
            await fetchLead();
            Alert.alert('Lead Dropped', 'Lead has been moved to the Dropped filter.');
          },
        },
      ]
    );
  };

  const handleReviveLead = async () => {
    await updateLeadStatus(leadId, 'waiting_for_call');
    await fetchLead();
    Alert.alert('Lead Revived', 'Lead is now active again under New Leads.');
  };

  const handleCall = (phone?: string) => {
    if (phone) {
      Linking.openURL(`tel:${phone.replace(/\s+/g, '')}`);
    }
  };

  // Build timeline entries from actual lead data
  const timelineEntries: { timestamp: string; label: string; color: string }[] = [];

  if (lead) {
    // Always: interest created
    timelineEntries.push({
      timestamp: lead.created_at,
      label: 'Tenant expressed interest via app',
      color: 'text-gray-600',
    });

    // Visit scheduled: check MOCK_SCHEDULES first (has real saved date string),
    // fall back to lead.updated_at if status is visit_scheduled
    const schedule = MOCK_SCHEDULES[leadId];
    if (schedule) {
      timelineEntries.push({
        timestamp: schedule.savedAt,
        label: `Visit scheduled — ${schedule.date} at ${schedule.location}`,
        color: 'text-blue-700',
      });
    } else if (lead.status === 'visit_scheduled') {
      timelineEntries.push({
        timestamp: lead.updated_at,
        label: 'Visit scheduled by connector',
        color: 'text-blue-700',
      });
    }

    // Linked / deal closed
    if (lead.status === 'linked') {
      timelineEntries.push({
        timestamp: lead.updated_at,
        label: 'Deal closed — contacts revealed, payout logged',
        color: 'text-emerald-700',
      });
    }

    // Dropped
    if (lead.status === 'not_selected') {
      timelineEntries.push({
        timestamp: lead.updated_at,
        label: 'Lead marked as Not Interested by staff',
        color: 'text-red-600',
      });
    }
  }

  if (notFound) {
    return (
      <View className="flex-1 bg-gray-50 pt-8">
        <HeaderBar title="Lead Detail" showBack />
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-xl font-bold text-gray-900 mb-2">Lead not found</Text>
          <Text className="text-sm text-gray-500 text-center mb-6">
            This lead may have been removed or the link is stale.
          </Text>
          <TouchableOpacity
            onPress={() => router.replace('/(staff)/leads')}
            className="bg-blue-700 px-6 py-3 rounded-xl"
          >
            <Text className="text-sm font-bold text-white">Back to Leads</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50 pt-8 justify-between">
      <View className="flex-1">
        <HeaderBar title="Lead Detail" showBack />

        <ScrollView className="p-4 flex-1">
          {/* Lead Status Card */}
          <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
            <View className="flex-row justify-between items-start mb-2">
              <View>
                <Text className="text-xl font-bold text-gray-900">
                  {lead?.tenant?.full_name || 'Abebe Bikila'}
                </Text>
                <Text className="text-xs text-gray-500">
                  Tenant Lead • FAYIDA Verified ({lead?.tenant?.fayida_id || 'ET-9821-****-8841'})
                </Text>
              </View>
              <View
                className={`px-3 py-1 rounded-full ${
                  isDropped
                    ? 'bg-gray-200'
                    : isLinked
                    ? 'bg-emerald-100'
                    : 'bg-blue-100'
                }`}
              >
                <Text
                  className={`text-xs font-bold ${
                    isDropped
                      ? 'text-gray-700'
                      : isLinked
                      ? 'text-emerald-800'
                      : 'text-blue-800'
                  }`}
                >
                  {isDropped
                    ? 'Dropped'
                    : isLinked
                    ? 'Deal Closed'
                    : lead?.status === 'visit_scheduled'
                    ? 'Meeting Scheduled'
                    : 'New Lead'}
                </Text>
              </View>
            </View>

            {/* Contact Box */}
            <View className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex-row items-center justify-between my-3">
              <View>
                <Text className="text-xs text-blue-700 font-semibold">Tenant Phone Contact</Text>
                <Text className="text-base font-bold text-blue-950">
                  {lead?.tenant?.phone || '+251 911 234 567'}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => handleCall(lead?.tenant?.phone || '+251 911 234 567')}
                className="bg-blue-700 px-4 py-2 rounded-lg flex-row items-center"
              >
                <Text className="text-xs font-bold text-white">📞 Call Now</Text>
              </TouchableOpacity>
            </View>

            {/* Landlord Contact Box */}
            <View className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex-row items-center justify-between">
              <View>
                <Text className="text-xs text-emerald-700 font-semibold">Landlord Owner</Text>
                <Text className="text-sm font-bold text-emerald-950">
                  {lead?.landlord?.full_name || 'Kebede Tassew'}
                </Text>
                <Text className="text-xs text-emerald-800">
                  {lead?.landlord?.phone || '+251 922 887 766'}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => handleCall(lead?.landlord?.phone || '+251 922 887 766')}
                className="bg-emerald-700 px-3.5 py-2 rounded-lg"
              >
                <Text className="text-xs font-bold text-white">Call Owner</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Target Property */}
          <Text className="text-sm font-bold text-gray-700 mb-2">Target Property</Text>
          <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-4">
            <Text className="text-base font-bold text-gray-900 mb-1">
              {lead?.listing?.title || 'Modern 2BR Lakeside Villa'}
            </Text>
            <Text className="text-xs text-gray-500 mb-2">
              {lead?.listing?.location || 'Haile Resort Area, Hawassa'}
            </Text>
            <Text className="text-base font-extrabold text-blue-800">
              {lead?.listing?.price
                ? `${lead.listing.price.toLocaleString()} ETB / month`
                : '25,000 ETB / month'}
            </Text>
          </View>

          {/* Scheduled Visit Card */}
          {MOCK_SCHEDULES[leadId] && (
            <>
              <Text className="text-sm font-bold text-gray-700 mb-2">Scheduled Visit</Text>
              <View className="bg-blue-50 border border-blue-200 p-4 rounded-2xl mb-4">
                <View className="flex-row items-center mb-1">
                  <Text className="text-xs font-bold text-blue-900">📅 Date & Time: </Text>
                  <Text className="text-xs text-blue-800">{MOCK_SCHEDULES[leadId].date}</Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="text-xs font-bold text-blue-900">📍 Location: </Text>
                  <Text className="text-xs text-blue-800">{MOCK_SCHEDULES[leadId].location}</Text>
                </View>
              </View>
            </>
          )}

          {/* Connector Timeline */}
          <Text className="text-sm font-bold text-gray-700 mb-2">Connector Activity Timeline</Text>
          <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
            {timelineEntries.map((entry, i) => (
              <Text key={i} className={`text-xs leading-5 ${entry.color} ${i > 0 ? 'mt-1' : ''}`}>
                • {formatTimestamp(entry.timestamp)}: {entry.label}
              </Text>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Action Bar */}
      <View className="p-4 border-t border-gray-100 bg-white flex-col space-y-2">
        {!isLinked && (
          <View className="flex-row space-x-3 mb-2">
            {isDropped ? (
              <TouchableOpacity
                onPress={handleReviveLead}
                activeOpacity={0.8}
                className="flex-1 py-3.5 bg-blue-100 border border-blue-300 rounded-xl items-center justify-center"
              >
                <Text className="text-xs font-bold text-blue-800">↺ Revive Lead</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleMarkNotInterested}
                activeOpacity={0.8}
                className="flex-1 py-3.5 bg-red-50 border border-red-200 rounded-xl items-center justify-center"
              >
                <Text className="text-xs font-bold text-red-700">🚫 Mark Not Interested</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => router.push(`/(staff)/schedule?leadId=${leadId}`)}
              activeOpacity={0.8}
              className="flex-1 py-3.5 bg-gray-100 rounded-xl items-center justify-center"
            >
              <Text className="text-xs font-bold text-gray-800">Schedule Visit</Text>
            </TouchableOpacity>
          </View>
        )}

        {!isLinked && !isDropped && (
          <TouchableOpacity
            onPress={() => router.push(`/(staff)/close-deal/${leadId}`)}
            activeOpacity={0.8}
            className="w-full py-4 bg-emerald-700 rounded-xl items-center justify-center shadow-sm"
          >
            <Text className="text-base font-bold text-white">Close Deal 🤝</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
