import { View, Text } from 'react-native';

interface SkillCardProps {
  emoji: string;
  name: string;
}

export function SkillCard({ emoji, name }: SkillCardProps) {
  return (
    <View className="bg-white rounded-lg p-4 mb-3 flex-row items-center border border-gray-200">
      <Text className="text-3xl mr-3">{emoji}</Text>
      <Text className="text-lg font-semibold text-gray-800">{name}</Text>
    </View>
  );
}