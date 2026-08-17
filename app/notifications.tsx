import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import HeaderBar from '@/components/ui/HeaderBar';
import { MOCK_INTERESTS, MOCK_PAYOUTS } from '@/lib/mock/data';

function formatRelativeTime(ts: string | null): string {
  if (!ts) return '';
  try {
    const diff = Date.now() - new Date(ts).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  } catch {
    return '';
  }
}

export default function NotificationsScreen() {
  const notifications = [
    // One notification per interest created
    ...MOCK_INTERESTS.map((interest) => ({
      id: `interest-${interest.id}`,
      title: 'New Rental Inquiry',
      message: `${interest.tenant?.full_name || 'A tenant'} is interested in "${interest.listing?.title || 'a property'}".`,
      time: formatRelativeTime(interest.created_at),
      unread: interest.status === 'waiting_for_call',
    })),
    // One notification per linked (closed) deal
    ...MOCK_INTERESTS
      .filter((i) => i.status === 'linked')
      .map((interest) => ({
        id: `linked-${interest.id}`,
        title: 'Deal Closed 🎉',
        message: `Deal closed for "${interest.listing?.title || 'a property'}". Contacts are now revealed.`,
        time: formatRelativeTime(interest.updated_at),
        unread: false,
      })),
    // One notification per paid payout
    ...MOCK_PAYOUTS
      .filter((p) => p.status === 'paid')
      .map((payout) => ({
        id: `payout-${payout.id}`,
        title: 'Commission Paid ✅',
        message: `${payout.amount.toLocaleString()} ETB commission paid for "${payout.link?.listing?.title || 'a deal'}".`,
        time: formatRelativeTime(payout.paid_at || payout.created_at),
        unread: false,
      })),
  ].sort((a, b) => 0); // keep insertion order for now

  return (
    <View className="flex-1 bg-gray-50 pt-8">
      <HeaderBar title="Notifications" showBack />

      <ScrollView className="flex-1 p-4">
        {notifications.length === 0 ? (
          <Text className="text-sm text-gray-400 text-center py-8">No notifications yet.</Text>
        ) : (
          notifications.map((n) => (
            <TouchableOpacity
              key={n.id}
              activeOpacity={0.8}
              className={`p-4 rounded-2xl mb-3 border ${
                n.unread ? 'bg-amber-50/60 border-amber-200' : 'bg-white border-gray-100'
              }`}
            >
              <View className="flex-row justify-between items-start mb-1">
                <Text className="text-base font-bold text-gray-900">{n.title}</Text>
                <Text className="text-xs text-gray-400">{n.time}</Text>
              </View>
              <Text className="text-xs text-gray-600 leading-5">{n.message}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}
