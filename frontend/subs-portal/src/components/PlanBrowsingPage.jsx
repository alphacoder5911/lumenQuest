import React, { useState } from "react";
import { Zap, Gift } from "lucide-react";
import "./PlanBrowsingPage.css";

// Main 10 Plans
const plansData = [
  { id: 1, name: "Basic Plan", price: 199, data: "1.5GB/day", validity: "28 Days", offer: "10% Off", description: "Perfect for light users." },
  { id: 2, name: "Standard Plan", price: 399, data: "2GB/day", validity: "56 Days", description: "Ideal for moderate users." },
  { id: 3, name: "Premium Plan", price: 599, data: "3GB/day", validity: "84 Days", offer: "20% Off", description: "For heavy internet users." },
  { id: 4, name: "Lumen Ultra Plan", price: 799, data: "4GB/day", validity: "90 Days", offer: "25% Off", recommended: true, description: "Ultra-fast connectivity." },
  { id: 5, name: "Festive Special", price: 999, data: "5GB/day", validity: "120 Days", offer: "30% Festive Discount 🎉", recommended: true, description: "Maximum data and fun." },
  { id: 6, name: "Family Pack", price: 1299, data: "6GB/day", validity: "150 Days", offer: "35% Festive Discount 🎊", recommended: true, description: "Share data with family." },
  { id: 7, name: "Student Saver", price: 299, data: "2GB/day", validity: "30 Days", description: "Affordable plan for students." },
  { id: 8, name: "Business Pro", price: 1499, data: "8GB/day", validity: "180 Days", offer: "15% Off", description: "Reliable fast data for business." },
  { id: 9, name: "OTT Lovers Pack", price: 499, data: "3GB/day", validity: "45 Days", description: "Free OTT subscriptions included." },
  { id: 10, name: "Night Owl Pack", price: 299, data: "Unlimited 12AM–6AM", validity: "30 Days", description: "Unlimited night internet." }
];

// Suggested Plans (Separate)
const suggestedPlans = [
  { id: 11, name: "Travel Max", price: 699, data: "Unlimited", validity: "14 Days", offer: "Special Deal", description: "Unlimited data while traveling." },
  { id: 12, name: "Gamer’s Choice", price: 899, data: "5GB/day", validity: "60 Days", description: "Optimized for online gaming." },
  { id: 13, name: "Weekend Bonanza", price: 349, data: "Unlimited on weekends", validity: "28 Days", description: "Perfect for weekend bingeing." },
  { id: 14, name: "Annual Super Saver", price: 4999, data: "2GB/day", validity: "365 Days", offer: "20% Off", description: "Best value for the whole year." }
];

export default function PlanBrowsingPage() {
  const [wishlist, setWishlist] = useState([]);
  const [compareList, setCompareList] = useState([]);

  const calculateDiscountedPrice = (plan) => {
    if (plan.offer && plan.offer.includes("%")) {
      const discount = parseInt(plan.offer);
      return plan.price - (plan.price * discount) / 100;
    }
    return plan.price;
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleCompare = (id) => {
    setCompareList(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="plan-page">
      <header className="plan-header">
        <h1><Zap />Subscription Plans</h1>
        <p>Choose the best connectivity powered by Lumen ⚡</p>
      </header>

      <div className="plan-banner">
        <h2><Gift /> Festive Season Sale 🎉</h2>
        <p>Enjoy up to 35% off on select plans!</p>
      </div>

      {/* Main Plans */}
      <h2>Main Plans</h2>
      <div className="plan-grid">
        {plansData.map(plan => (
          <div key={plan.id} className="plan-card">
            <h3>{plan.name} {plan.offer && <span>{plan.offer}</span>}</h3>
            <p>{plan.data} | {plan.validity}</p>
            <p>{plan.description}</p>
            {plan.offer ? <p><del>₹{plan.price}</del> ₹{calculateDiscountedPrice(plan)}</p> : <p>₹{plan.price}</p>}
            <div className="plan-buttons">
              <button className="subscribe-btn">Subscribe</button>
              <button onClick={() => toggleWishlist(plan.id)}>{wishlist.includes(plan.id) ? "❤️" : "🤍"}</button>
              <button onClick={() => toggleCompare(plan.id)}>{compareList.includes(plan.id) ? "✔️" : "⬜"}</button>
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Plans */}
      <h2>Suggested Plans</h2>
      <div className="suggested-carousel">
        {suggestedPlans.map(plan => (
          <div key={plan.id} className="plan-card suggested">
            <h3>{plan.name} {plan.offer && <span>{plan.offer}</span>}</h3>
            <p>{plan.data} | {plan.validity}</p>
            <p>{plan.description}</p>
            {plan.offer ? <p><del>₹{plan.price}</del> ₹{calculateDiscountedPrice(plan)}</p> : <p>₹{plan.price}</p>}
            <div className="plan-buttons">
              <button className="subscribe-btn">Subscribe</button>
              <button onClick={() => toggleWishlist(plan.id)}>{wishlist.includes(plan.id) ? "❤️" : "🤍"}</button>
              <button onClick={() => toggleCompare(plan.id)}>{compareList.includes(plan.id) ? "✔️" : "⬜"}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
