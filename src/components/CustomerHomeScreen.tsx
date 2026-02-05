import { Scissors, Menu, Bell, User, ChevronRight, Star, Heart, Sparkles, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from 'figma:asset/84082bc92cff37142f6dde0f419382ae7d6cc386.png';
import { useState, useEffect } from 'react';
import { SideMenu } from './SideMenu';
import { authAPI } from '../services/api';
import { BottomNav } from './BottomNav';
import { HowItWorks } from './HowItWorks';

interface CustomerHomeScreenProps {
  onStartOrder: (category: string, style: string) => void;
  onNavigate: (screen: string) => void;
  shouldOpenMenu?: boolean;
  onMenuOpenChange?: (isOpen: boolean) => void;
  isDarkMode?: boolean;
  userName?: string;
}

export function CustomerHomeScreen({ onStartOrder, onNavigate, shouldOpenMenu = false, onMenuOpenChange, isDarkMode = false, userName: userNameProp }: CustomerHomeScreenProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'Men' | 'Women' | 'Kids'>('Men');
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [userName, setUserName] = useState(userNameProp || '');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Get user name from auth or prop
  useEffect(() => {
    if (userNameProp) {
      setUserName(userNameProp);
    } else {
      const user = authAPI.getCurrentUser();
      if (user) {
        setUserName(user.name);
      }
    }
  }, [userNameProp]);

  // Auto-open menu when returning from submenu
  useEffect(() => {
    if (shouldOpenMenu) {
      setIsMenuOpen(true);
    }
  }, [shouldOpenMenu]);

  // Notify parent when menu state changes
  useEffect(() => {
    if (onMenuOpenChange) {
      onMenuOpenChange(isMenuOpen);
    }
  }, [isMenuOpen, onMenuOpenChange]);

  const handleCategoryChange = (category: 'Men' | 'Women' | 'Kids') => {
    if (category !== selectedCategory) {
      // Determine slide direction based on category order
      const categories = ['Men', 'Women', 'Kids'];
      const currentIndex = categories.indexOf(selectedCategory);
      const newIndex = categories.indexOf(category);
      
      setSlideDirection(newIndex > currentIndex ? 'right' : 'left');
      setIsAnimating(true);
      
      setTimeout(() => {
        setSelectedCategory(category);
        setTimeout(() => setIsAnimating(false), 30);
      }, 250);
    }
  };

  const menStyles = [
    // Top Wear
    { 
      name: 'Shirt', 
      category: 'Top Wear',
      image: 'https://images.unsplash.com/photo-1639372964829-ef91010c2911?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBkcmVzcyUyMHNoaXJ0fGVufDF8fHx8MTc2ODQxMzg1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'T-Shirt', 
      category: 'Top Wear',
      image: 'https://images.unsplash.com/photo-1759596450534-0a960be607e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjB0LXNoaXJ0JTIwY2FzdWFsfGVufDF8fHx8MTc2ODM2NTU2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Kurta', 
      category: 'Top Wear',
      image: 'https://images.unsplash.com/photo-1744551358303-46edae8b374b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBrdXJ0YSUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2ODQ1OTU4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Jacket', 
      category: 'Top Wear',
      image: 'https://images.unsplash.com/photo-1766113492895-2d8711c4b126?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBqYWNrZXQlMjBmb3JtYWx8ZW58MXx8fHwxNzY4NDYyODY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Blazer', 
      category: 'Top Wear',
      image: 'https://images.unsplash.com/photo-1598915850252-fb07ad1e6768?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWl0JTIwamFja2V0JTIwbWVufGVufDF8fHx8MTc2ODQ1OTU4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Waistcoat', 
      category: 'Top Wear',
      image: 'https://images.unsplash.com/photo-1754577060078-21315dd188c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YWlzdGNvYXQlMjB2ZXN0JTIwbWVufGVufDF8fHx8MTc2ODQ1OTU4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    // Bottom Wear
    { 
      name: 'Trouser / Pant', 
      category: 'Bottom Wear',
      image: 'https://images.unsplash.com/photo-1602585198422-d795fa9bfd6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjB0cm91c2VyJTIwcGFudHN8ZW58MXx8fHwxNzY4NDYyODY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Jeans', 
      category: 'Bottom Wear',
      image: 'https://images.unsplash.com/photo-1602585198422-d795fa9bfd6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjB0cm91c2VyJTIwcGFudHN8ZW58MXx8fHwxNzY4NDYyODY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    // Ethnic Wear
    { 
      name: 'Kurta-Pyjama', 
      category: 'Ethnic Wear',
      image: 'https://images.unsplash.com/photo-1744551358303-46edae8b374b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBrdXJ0YSUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2ODQ1OTU4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Pathani Suit', 
      category: 'Ethnic Wear',
      image: 'https://images.unsplash.com/photo-1757598079169-b8655dc3e933?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXRoYW5pJTIwc3VpdCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2ODQ1NzY2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Sherwani', 
      category: 'Ethnic Wear',
      image: 'https://images.unsplash.com/photo-1534217466718-ef4950786e24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGVyd2FuaSUyMHdlZGRpbmd8ZW58MXx8fHwxNzY4NDU5NTgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    // Formal Wear
    { 
      name: '2-Piece Suit', 
      category: 'Formal Wear',
      image: 'https://images.unsplash.com/photo-1765175094646-dfb7ca72367a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JtYWwlMjBzdWl0JTIwbWVufGVufDF8fHx8MTc2ODMzNDc4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: '3-Piece Suit', 
      category: 'Formal Wear',
      image: 'https://images.unsplash.com/photo-1765175094646-dfb7ca72367a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JtYWwlMjBzdWl0JTIwbWVufGVufDF8fHx8MTc2ODMzNDc4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
  ];

  const womenStyles = [
    // Top Wear
    { 
      name: 'Blouse', 
      category: 'Top Wear',
      image: 'https://images.unsplash.com/photo-1694243382362-14da84ba6a2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXJlZSUyMGJsb3VzZXxlbnwxfHx8fDE3Njg0NTk1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Kurti', 
      category: 'Top Wear',
      image: 'https://images.unsplash.com/photo-1745313452052-0e4e341f326c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrdXJ0aSUyMHdvbWVufGVufDF8fHx8MTc2ODQ1OTU4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Top', 
      category: 'Top Wear',
      image: 'https://images.unsplash.com/photo-1768289222455-893014681363?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMHRvcCUyMGZhc2hpb258ZW58MXx8fHwxNzY4NDU5OTIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Tunic', 
      category: 'Top Wear',
      image: 'https://images.unsplash.com/photo-1745313452052-0e4e341f326c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrdXJ0aSUyMHdvbWVufGVufDF8fHx8MTc2ODQ1OTU4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Shirt', 
      category: 'Top Wear',
      image: 'https://images.unsplash.com/photo-1768289222455-893014681363?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMHRvcCUyMGZhc2hpb258ZW58MXx8fHwxNzY4NDU5OTIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Jacket', 
      category: 'Top Wear',
      image: 'https://images.unsplash.com/photo-1766113492895-2d8711c4b126?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBqYWNrZXQlMjBmb3JtYWx8ZW58MXx8fHwxNzY4NDYyODY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    // Bottom Wear
    { 
      name: 'Leggings', 
      category: 'Bottom Wear',
      image: 'https://images.unsplash.com/photo-1766556514059-303c3b790424?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMHBhbGF6em8lMjBwYW50c3xlbnwxfHx8fDE3Njg0NjI4NzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Pants', 
      category: 'Bottom Wear',
      image: 'https://images.unsplash.com/photo-1766556514059-303c3b790424?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMHBhbGF6em8lMjBwYW50c3xlbnwxfHx8fDE3Njg0NjI4NzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Palazzo', 
      category: 'Bottom Wear',
      image: 'https://images.unsplash.com/photo-1766556514059-303c3b790424?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMHBhbGF6em8lMjBwYW50c3xlbnwxfHx8fDE3Njg0NjI4NzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Skirt', 
      category: 'Bottom Wear',
      image: 'https://images.unsplash.com/photo-1653419403196-ab64c4c740c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMHNraXJ0JTIwZmFzaGlvbnxlbnwxfHx8fDE3NjgzOTEwODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Salwar', 
      category: 'Bottom Wear',
      image: 'https://images.unsplash.com/photo-1597983073750-16f5ded1321f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWx3YXIlMjBzdWl0fGVufDF8fHx8MTc2ODQ1OTU4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    // Ethnic Wear
    { 
      name: 'Salwar Kameez', 
      category: 'Ethnic Wear',
      image: 'https://images.unsplash.com/photo-1597983073750-16f5ded1321f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWx3YXIlMjBzdWl0fGVufDF8fHx8MTc2ODQ1OTU4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Anarkali', 
      category: 'Ethnic Wear',
      image: 'https://images.unsplash.com/photo-1701456108005-238f481800ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFya2FsaSUyMGRyZXNzJTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzY4NDYyODcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Lehenga Choli', 
      category: 'Ethnic Wear',
      image: 'https://images.unsplash.com/photo-1724856604254-f7cf4e9c8f72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWhlbmdhJTIwYnJpZGFsfGVufDF8fHx8MTc2ODQ1OTU4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    // Western Wear
    { 
      name: 'Dress', 
      category: 'Western Wear',
      image: 'https://images.unsplash.com/photo-1721990336298-90832e791b5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGRyZXNzJTIwZmFzaGlvbnxlbnwxfHx8fDE3Njg0NTk1ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Gown', 
      category: 'Western Wear',
      image: 'https://images.unsplash.com/photo-1763336016192-c7b62602e993?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZ293bnxlbnwxfHx8fDE3Njg0NTk1ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Jumpsuit', 
      category: 'Western Wear',
      image: 'https://images.unsplash.com/photo-1721990336298-90832e791b5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGRyZXNzJTIwZmFzaGlvbnxlbnwxfHx8fDE3Njg0NTk1ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
  ];

  // Customer testimonials data
  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      text: "The fit was perfect! My wedding lehenga turned out exactly how I imagined. The tailor's attention to detail was amazing.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200"
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi",
      rating: 5,
      text: "Got my suit stitched for an important meeting. Professional service, on-time delivery, and excellent quality!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200"
    },
    {
      name: "Ananya Reddy",
      location: "Bangalore",
      rating: 5,
      text: "Best tailoring app I've used. The express delivery option saved me when I needed a saree blouse urgently. Highly recommend!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const childrenStyles = [
    // Top Wear
    { 
      name: 'Shirt', 
      category: 'Top Wear',
      image: 'https://images.unsplash.com/photo-1766974888415-53e687305ec4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGNhc3VhbCUyMHNoaXJ0fGVufDF8fHx8MTc2ODQ1OTU4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'T-Shirt', 
      category: 'Top Wear',
      image: 'https://images.unsplash.com/photo-1632195217465-4f334314762f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwdC1zaGlydCUyMGNvbG9yZnVsfGVufDF8fHx8MTc2ODQ2Mjg3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Kurta', 
      category: 'Top Wear',
      image: 'https://images.unsplash.com/photo-1642391326202-8632400af62b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGV0aG5pYyUyMHdlYXJ8ZW58MXx8fHwxNzY4NDU5NTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Top', 
      category: 'Top Wear',
      image: 'https://images.unsplash.com/photo-1632195217465-4f334314762f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwdC1zaGlydCUyMGNvbG9yZnVsfGVufDF8fHx8MTc2ODQ2Mjg3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    // Bottom Wear
    { 
      name: 'Pants', 
      category: 'Bottom Wear',
      image: 'https://images.unsplash.com/photo-1765939946170-479756af1f13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwc2hvcnRzJTIwY2FzdWFsfGVufDF8fHx8MTc2ODQ2Mjg3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Shorts', 
      category: 'Bottom Wear',
      image: 'https://images.unsplash.com/photo-1765939946170-479756af1f13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwc2hvcnRzJTIwY2FzdWFsfGVufDF8fHx8MTc2ODQ2Mjg3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    // Ethnic Wear
    { 
      name: 'Ethnic Set', 
      category: 'Ethnic Wear',
      image: 'https://images.unsplash.com/photo-1642391326202-8632400af62b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGV0aG5pYyUyMHdlYXJ8ZW58MXx8fHwxNzY4NDU5NTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Sherwani', 
      category: 'Ethnic Wear',
      image: 'https://images.unsplash.com/photo-1642391326202-8632400af62b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGV0aG5pYyUyMHdlYXJ8ZW58MXx8fHwxNzY4NDU5NTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Lehenga', 
      category: 'Ethnic Wear',
      image: 'https://images.unsplash.com/photo-1642391326202-8632400af62b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGV0aG5pYyUyMHdlYXJ8ZW58MXx8fHwxNzY4NDU5NTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Ghagra', 
      category: 'Ethnic Wear',
      image: 'https://images.unsplash.com/photo-1642391326202-8632400af62b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGV0aG5pYyUyMHdlYXJ8ZW58MXx8fHwxNzY4NDU5NTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    // Party / Special Wear
    { 
      name: 'Suit', 
      category: 'Party / Special Wear',
      image: 'https://images.unsplash.com/photo-1766974888415-53e687305ec4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGNhc3VhbCUyMHNoaXJ0fGVufDF8fHx8MTc2ODQ1OTU4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Dress', 
      category: 'Party / Special Wear',
      image: 'https://images.unsplash.com/photo-1545871084-74033c05b595?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwcGFydHklMjBkcmVzc3xlbnwxfHx8fDE3Njg0NTk1ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Gown', 
      category: 'Party / Special Wear',
      image: 'https://images.unsplash.com/photo-1545871084-74033c05b595?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwcGFydHklMjBkcmVzc3xlbnwxfHx8fDE3Njg0NTk1ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
  ];

  // Get current styles based on selected category
  const getCurrentStyles = () => {
    switch (selectedCategory) {
      case 'Men':
        return menStyles;
      case 'Women':
        return womenStyles;
      case 'Kids':
        return childrenStyles;
      default:
        return menStyles;
    }
  };

  const currentStyles = getCurrentStyles();

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#2d1a1a]' 
        : 'bg-gradient-to-br from-[#F5E6D3] via-[#EDD9B8] to-[#D4AF37]'
    }`} style={{ paddingTop: 'var(--safe-area-inset-top)' }}>
      {/* Side Menu */}
      <SideMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
        onNavigate={onNavigate}
        isDarkMode={isDarkMode}
      />
      
      {/* Decorative Background Elements - Only in Light Mode */}
      {!isDarkMode && (
        <>
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-radial-gradient(circle at 0 0, transparent 0, #7A1F1F 10px, transparent 20px)`,
              backgroundSize: '80px 80px'
            }}></div>
          </div>
          
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#D4AF37]/10"></div>
        </>
      )}
      
      {/* Header - Fixed with safe area */}
      <div className="sticky top-0 z-50 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-sm">
        <div className="flex justify-between items-center p-6 pb-4 relative z-10">
        <button className={isDarkMode ? 'text-[#D4AF37]' : 'text-[#7A1F1F]'} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2 relative">
          <div className="absolute inset-0 bg-[#D4AF37] rounded-full blur-lg opacity-20 scale-125"></div>
          <ImageWithFallback 
            src={logo}
            alt="METAIA Logo"
            className="relative w-10 h-10 object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] filter brightness-105"
            style={{ mixBlendMode: 'normal' }}
          />
        </div>
        <button className={`${isDarkMode ? 'text-[#D4AF37]' : 'text-[#7A1F1F]'} relative`}>
          <Bell className="w-6 h-6" />
          <div className={`absolute -top-1 -right-1 w-3 h-3 ${isDarkMode ? 'bg-[#D4AF37]' : 'bg-[#7A1F1F]'} rounded-full border border-white`}></div>
        </button>
      </div>
      </div>

      {/* Scrollable Content */}
      <div className="px-6 pb-24 overflow-y-auto relative z-10" style={{ maxHeight: 'calc(100vh - 100px)', paddingBottom: 'calc(var(--safe-area-inset-bottom) + 80px)' }}>
        {/* Welcome Section */}
        <div className={`backdrop-blur-sm rounded-3xl p-6 mb-6 shadow-lg border-2 ${
          isDarkMode 
            ? 'bg-white/10 border-[#D4AF37]/30' 
            : 'bg-white/80 border-[#D4AF37]/20'
        }`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C5A028] flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className={`text-2xl font-serif ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#7A1F1F]'}`}>
                Welcome{userName ? `, ${userName}` : ''}!
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-[#7A1F1F]/70'}`}>Your journey begins here</p>
            </div>
          </div>
          <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-[#7A1F1F]/80'}`}>
            Experience the finest in royal tailoring. Let us craft perfection for you.
          </p>
        </div>

        {/* Key Features Banner - NEW COMPETITIVE FEATURES */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <div className={`backdrop-blur-sm rounded-2xl p-4 shadow-lg border ${
            isDarkMode 
              ? 'bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A028]/10 border-[#D4AF37]/30' 
              : 'bg-gradient-to-br from-white to-[#FFF9E5] border-[#D4AF37]/30'
          }`}>
            <div className="text-center">
              <div className="text-2xl mb-1">✂️</div>
              <div className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-[#7A1F1F]'}`}>2 Free</div>
              <div className={`text-[10px] ${isDarkMode ? 'text-white/70' : 'text-[#7A1F1F]/70'}`}>Alterations</div>
            </div>
          </div>

          <div className={`backdrop-blur-sm rounded-2xl p-4 shadow-lg border ${
            isDarkMode 
              ? 'bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A028]/10 border-[#D4AF37]/30' 
              : 'bg-gradient-to-br from-white to-[#FFF9E5] border-[#D4AF37]/30'
          }`}>
            <div className="text-center">
              <div className="text-2xl mb-1">🚚</div>
              <div className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-[#7A1F1F]'}`}>Free Home</div>
              <div className={`text-[10px] ${isDarkMode ? 'text-white/70' : 'text-[#7A1F1F]/70'}`}>Delivery</div>
            </div>
          </div>

          <div className={`backdrop-blur-sm rounded-2xl p-4 shadow-lg border ${
            isDarkMode 
              ? 'bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A028]/10 border-[#D4AF37]/30' 
              : 'bg-gradient-to-br from-white to-[#FFF9E5] border-[#D4AF37]/30'
          }`}>
            <div className="text-center">
              <div className="text-2xl mb-1">⚡</div>
              <div className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-[#7A1F1F]'}`}>24-48 Hour</div>
              <div className={`text-[10px] ${isDarkMode ? 'text-white/70' : 'text-[#7A1F1F]/70'}`}>Express Option</div>
            </div>
          </div>

          <div className={`backdrop-blur-sm rounded-2xl p-4 shadow-lg border ${
            isDarkMode 
              ? 'bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A028]/10 border-[#D4AF37]/30' 
              : 'bg-gradient-to-br from-white to-[#FFF9E5] border-[#D4AF37]/30'
          }`}>
            <div className="text-center">
              <div className="text-2xl mb-1">👨‍🎨</div>
              <div className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-[#7A1F1F]'}`}>Designer</div>
              <div className={`text-[10px] ${isDarkMode ? 'text-white/70' : 'text-[#7A1F1F]/70'}`}>Consultation</div>
            </div>
          </div>
        </div>

        {/* Category Selector */}
        <div className="mb-6">
          <div className={`backdrop-blur-sm rounded-3xl p-2 shadow-lg border-2 ${
            isDarkMode 
              ? 'bg-white/10 border-[#D4AF37]/30' 
              : 'bg-white/80 border-[#D4AF37]/20'
          }`}>
            <div className="grid grid-cols-3 gap-2">
              {/* Men Category */}
              <button
                onClick={() => handleCategoryChange('Men')}
                className={`flex flex-col items-center justify-center py-2 px-1.5 rounded-2xl transition-all duration-300 hover:scale-125 ${
                  selectedCategory === 'Men'
                    ? 'bg-gradient-to-br from-[#7A1F1F] to-[#5A1515] text-white shadow-md scale-105'
                    : isDarkMode 
                      ? 'bg-white/10 text-[#D4AF37] hover:bg-white/20 scale-90'
                      : 'bg-white/50 text-[#7A1F1F] hover:bg-white/70 scale-90'
                }`}
              >
                <svg className="w-6 h-6 mb-1 transition-all" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
                </svg>
                <span className="text-[10px] font-semibold">Men</span>
              </button>

              {/* Women Category */}
              <button
                onClick={() => handleCategoryChange('Women')}
                className={`flex flex-col items-center justify-center py-2 px-1.5 rounded-2xl transition-all duration-300 hover:scale-125 ${
                  selectedCategory === 'Women'
                    ? 'bg-gradient-to-br from-[#7A1F1F] to-[#5A1515] text-white shadow-md scale-105'
                    : isDarkMode 
                      ? 'bg-white/10 text-[#D4AF37] hover:bg-white/20 scale-90'
                      : 'bg-white/50 text-[#7A1F1F] hover:bg-white/70 scale-90'
                }`}
              >
                <svg className="w-6 h-6 mb-1 transition-all" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V19C4 19.55 4.45 20 5 20H19C19.55 20 20 19.55 20 19V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
                </svg>
                <span className="text-[10px] font-semibold">Women</span>
              </button>

              {/* Kids Category */}
              <button
                onClick={() => handleCategoryChange('Kids')}
                className={`flex flex-col items-center justify-center py-2 px-1.5 rounded-2xl transition-all duration-300 hover:scale-125 ${
                  selectedCategory === 'Kids'
                    ? 'bg-gradient-to-br from-[#7A1F1F] to-[#5A1515] text-white shadow-md scale-105'
                    : isDarkMode 
                      ? 'bg-white/10 text-[#D4AF37] hover:bg-white/20 scale-90'
                      : 'bg-white/50 text-[#7A1F1F] hover:bg-white/70 scale-90'
                }`}
              >
                <svg className="w-6 h-6 mb-1 transition-all" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 7.5C13.38 7.5 14.5 6.38 14.5 5C14.5 3.62 13.38 2.5 12 2.5C10.62 2.5 9.5 3.62 9.5 5C9.5 6.38 10.62 7.5 12 7.5ZM16 15.5L14 9H10L8 15.5V21.5H10V16H14V21.5H16V15.5Z" fill="currentColor"/>
                </svg>
                <span className="text-[10px] font-semibold">Kids</span>
              </button>
            </div>
          </div>
        </div>

        {/* Selected Collection */}
        <div className="mb-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-xl font-serif ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#7A1F1F]'}`}>{selectedCategory}'s Collection</h3>
            <Scissors className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div className="relative">
            {isAnimating && (
              <div 
                className={`grid grid-cols-3 gap-3 ${
                  slideDirection === 'right' 
                    ? 'animate-[slideOutToLeft_0.25s_ease-out]' 
                    : 'animate-[slideOutToRight_0.25s_ease-out]'
                }`}
              >
                {currentStyles.map((style, index) => (
                  <div
                    key={style.name}
                    className={`backdrop-blur-sm rounded-2xl overflow-hidden shadow-md border-2 ${
                      isDarkMode 
                        ? 'bg-white/10 border-[#D4AF37]/30' 
                        : 'bg-white/80 border-[#D4AF37]/20'
                    }`}
                  >
                    <div className="aspect-square overflow-hidden">
                      <ImageWithFallback 
                        src={style.image}
                        alt={style.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className={`text-xs font-medium text-center py-3 leading-tight ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#7A1F1F]'}`}>{style.name}</p>
                  </div>
                ))}
              </div>
            )}
            {!isAnimating && (
              <div 
                className={`grid grid-cols-3 gap-3 ${
                  slideDirection === 'right' 
                    ? 'animate-[slideInFromRight_0.35s_ease-out]' 
                    : 'animate-[slideInFromLeft_0.35s_ease-out]'
                }`}
              >
                {currentStyles.map((style, index) => (
                  <button
                    key={style.name}
                    onClick={() => onStartOrder(selectedCategory === 'Kids' ? 'Children' : selectedCategory, style.name)}
                    className={`backdrop-blur-sm rounded-2xl overflow-hidden shadow-md border-2 hover:shadow-xl hover:scale-105 transition-all duration-300 group ${
                      isDarkMode 
                        ? 'bg-white/10 border-[#D4AF37]/30 hover:border-[#D4AF37]' 
                        : 'bg-white/80 border-[#D4AF37]/20 hover:border-[#D4AF37]'
                    }`}
                  >
                    <div className="aspect-square overflow-hidden">
                      <ImageWithFallback 
                        src={style.image}
                        alt={style.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <p className={`text-xs font-medium text-center py-3 leading-tight ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#7A1F1F]'}`}>{style.name}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-6">
          <HowItWorks isDarkMode={isDarkMode} />
        </div>

        {/* Customer Testimonials Section */}
        <div className={`mb-6 backdrop-blur-sm rounded-3xl p-6 shadow-lg border-2 ${
          isDarkMode 
            ? 'bg-white/10 border-[#D4AF37]/30' 
            : 'bg-white/80 border-[#D4AF37]/20'
        }`}>
          <div className="flex items-center gap-2 mb-4">
            <Star className={`w-5 h-5 ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#7A1F1F]'}`} />
            <h3 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#7A1F1F]'}`}>
              Customer Stories
            </h3>
          </div>

          {/* Testimonial Card */}
          <div className="relative overflow-hidden">
            <div 
              key={currentTestimonial}
              className="animate-[fadeInUp_0.5s_ease-out]"
            >
              <div className={`rounded-2xl p-5 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-white/5 to-white/10' 
                  : 'bg-gradient-to-br from-white to-[#FFF9E5]'
              }`}>
                {/* Rating Stars */}
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className={`text-sm mb-4 italic ${
                  isDarkMode ? 'text-white/80' : 'text-[#7A1F1F]/80'
                }`}>
                  "{testimonials[currentTestimonial].text}"
                </p>

                {/* Customer Info */}
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonials[currentTestimonial].avatar} 
                    alt={testimonials[currentTestimonial].name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#D4AF37]"
                  />
                  <div>
                    <p className={`text-sm font-semibold ${
                      isDarkMode ? 'text-white' : 'text-[#7A1F1F]'
                    }`}>
                      {testimonials[currentTestimonial].name}
                    </p>
                    <p className={`text-xs ${
                      isDarkMode ? 'text-white/60' : 'text-[#7A1F1F]/60'
                    }`}>
                      {testimonials[currentTestimonial].location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-[#D4AF37] w-6' 
                      : isDarkMode 
                        ? 'bg-white/30 hover:bg-white/50' 
                        : 'bg-[#7A1F1F]/30 hover:bg-[#7A1F1F]/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mb-6 backdrop-blur-sm rounded-3xl p-6 shadow-lg border-2 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A028]/10 border-[#D4AF37]/30' 
            : 'bg-gradient-to-br from-white to-[#FFF9E5] border-[#D4AF37]/30'
        }`}>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className={`w-5 h-5 ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#7A1F1F]'}`} />
            <h3 className={`text-lg font-serif font-bold ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#7A1F1F]'}`}>
              Why Choose METAIA
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className={`text-2xl font-bold mb-1 ${
                isDarkMode ? 'text-[#D4AF37]' : 'text-[#7A1F1F]'
              }`}>10K+</div>
              <div className={`text-xs ${
                isDarkMode ? 'text-white/70' : 'text-[#7A1F1F]/70'
              }`}>Happy Customers</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold mb-1 ${
                isDarkMode ? 'text-[#D4AF37]' : 'text-[#7A1F1F]'
              }`}>500+</div>
              <div className={`text-xs ${
                isDarkMode ? 'text-white/70' : 'text-[#7A1F1F]/70'
              }`}>Expert Tailors</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold mb-1 ${
                isDarkMode ? 'text-[#D4AF37]' : 'text-[#7A1F1F]'
              }`}>4.8★</div>
              <div className={`text-xs ${
                isDarkMode ? 'text-white/70' : 'text-[#7A1F1F]/70'
              }`}>Average Rating</div>
            </div>
          </div>
        </div>

        {/* Featured / Call to Action */}
        <div className="bg-gradient-to-br from-[#7A1F1F] to-[#5A1515] rounded-3xl p-6 text-white shadow-xl">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                <p className="text-xs text-[#D4AF37] font-semibold">EXCLUSIVE</p>
              </div>
              <h3 className="text-xl font-serif mb-2">Premium Collection</h3>
              <p className="text-sm text-white/80 mb-4">
                Discover our latest royal tailoring designs
              </p>
              <button className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-white font-semibold text-sm hover:bg-[#C5A028] transition-colors flex items-center gap-2">
                Explore Now
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="w-20 h-20 rounded-full border-2 border-[#D4AF37] flex items-center justify-center opacity-30">
              <Scissors className="w-10 h-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav 
        activeTab="home" 
        onNavigate={onNavigate} 
        isDarkMode={isDarkMode}
      />
    </div>
  );
}