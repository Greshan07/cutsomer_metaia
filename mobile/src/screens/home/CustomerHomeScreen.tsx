import React, { useMemo, useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { Sparkles } from 'lucide-react-native';

type HomeNavigation = NativeStackNavigationProp<RootStackParamList>;

const categories = ['Men', 'Women', 'Kids'] as const;

type StyleItem = {
  name: string;
  category: string;
  image: string;
};

const styleData: Record<typeof categories[number], StyleItem[]> = {
  Men: [
    { name: 'Shirt', category: 'Top Wear', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500' },
    { name: 'Kurta', category: 'Traditional', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500' },
    { name: 'Suit', category: 'Formal', image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=500' },
  ],
  Women: [
    { name: 'Dress', category: 'Full Body', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500' },
    { name: 'Lehenga', category: 'Traditional', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500' },
    { name: 'Gown', category: 'Formal', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500' },
  ],
  Kids: [
    { name: 'Shirt', category: 'Formal', image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=500' },
    { name: 'Dress', category: 'Full Body', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500' },
    { name: 'Kurta', category: 'Traditional', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500' },
  ],
};

export function CustomerHomeScreen() {
  const navigation = useNavigation<HomeNavigation>();
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('Men');

  const stylesForCategory = useMemo(() => styleData[selectedCategory], [selectedCategory]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={[colors.goldLight, colors.gold]} style={styles.hero}>
        <View style={styles.heroTop}>
          <Text style={styles.heroTitle}>METAIA Tailor</Text>
          <Sparkles color={colors.maroon} size={20} />
        </View>
        <Text style={styles.heroSubtitle}>Crafted fits. Effortless ordering.</Text>
        <Pressable style={styles.primaryCta} onPress={() => navigation.navigate('OrderFlow')}>
          <Text style={styles.primaryCtaText}>Start an Order</Text>
        </Pressable>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Choose Category</Text>
        <View style={styles.categoryRow}>
          {categories.map((category) => (
            <Pressable
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[styles.categoryButton, selectedCategory === category && styles.categoryActive]}
            >
              <Text style={[styles.categoryText, selectedCategory === category && styles.categoryTextActive]}>{category}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Styles</Text>
        <FlatList
          data={stylesForCategory}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.name}
          contentContainerStyle={styles.cardRow}
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() => navigation.navigate('OrderFlow', { category: selectedCategory, style: item.name })}
            >
              <Image source={{ uri: item.image }} style={styles.cardImage} />
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardMeta}>{item.category}</Text>
              </View>
            </Pressable>
          )}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why METAIA</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Precision tailoring on demand</Text>
          <Text style={styles.infoText}>Share your measurements, choose your design, and get stitched by vetted experts.</Text>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.goldLight,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 100,
  },
  hero: {
    padding: 28,
    paddingTop: 20,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.maroon,
    letterSpacing: 0.5,
  },
  heroSubtitle: {
    marginTop: 8,
    fontSize: 16,
    color: colors.muted,
  },
  primaryCta: {
    marginTop: 20,
    backgroundColor: colors.maroon,
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryCtaText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  section: {
    marginTop: 28,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.maroon,
    marginBottom: 4,
  },
  categoryRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  categoryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.borderGold,
    backgroundColor: colors.white,
  },
  categoryActive: {
    backgroundColor: colors.maroon,
    borderColor: colors.maroon,
  },
  categoryText: {
    color: colors.maroon,
    fontWeight: '700',
    fontSize: 15,
  },
  categoryTextActive: {
    color: colors.white,
  },
  cardRow: {
    marginTop: 14,
    gap: 16,
  },
  card: {
    width: 200,
    borderRadius: 24,
    backgroundColor: colors.white,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 140,
  },
  cardBody: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.maroon,
  },
  cardMeta: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 4,
  },
  infoCard: {
    marginTop: 12,
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 16,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.maroon,
  },
  infoText: {
    marginTop: 6,
    color: colors.muted,
  },
});
