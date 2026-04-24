export const getAIPlaceholders = (productName: string) => {
  return {
    sentimentScore: Math.floor(Math.random() * 20) + 75, // 75-95
    sentimentBreakdown: {
      positive: 85 + Math.floor(Math.random() * 10),
      neutral: 5 + Math.floor(Math.random() * 5),
      negative: 2 + Math.floor(Math.random() * 3)
    },
    trendingKeywords: [
      { text: 'Battery Life', type: 'positive' },
      { text: 'Noise Cancellation', type: 'positive' },
      { text: 'Premium Feel', type: 'positive' },
      { text: 'Ease of Use', type: 'positive' },
      { text: 'App Connectivity', type: 'negative' },
      { text: 'Pricing Value', type: 'negative' },
      { text: 'Charging Port', type: 'negative' }
    ],
    fakeReviewScore: Math.floor(Math.random() * 15) + 5,
    purchaseConfidence: Math.floor(Math.random() * 10) + 85,
    featureSatisfaction: [
      { name: 'Sound Quality', score: 94 },
      { name: 'Comfort', score: 92 },
      { name: 'Build', score: 88 }
    ],
    strategicRecommendations: {
      productImprovement: "AI model will provide product improvement suggestions soon.",
      marketingStrategy: "Marketing insights module coming soon.",
      buyerDecision: "Buyer recommendation model pending integration.",
      demandForecast: "Forecasting model will be connected soon.",
      competitorPositioning: "Competitive intelligence model coming soon."
    },
    demandForecast: "Forecasting model will be connected soon.",
    improvementPriorityIndex: "High priority for app connectivity stability.",
    customerPersonaSegments: ["Audiophiles", "Remote Workers", "Tech Enthusiasts"],
    churnRisk: "Low (8%)",
    retentionProbability: "High (82%)",
    successProbability: "Very High (89%)",
    regionWiseSentiment: {
      northAmerica: 92,
      europe: 88,
      asia: 85
    },
    trends: [
      { month: 'Jan', volume: 1200, rating: 4.7 },
      { month: 'Feb', volume: 1500, rating: 4.8 },
      { month: 'Mar', volume: 1800, rating: 4.8 }
    ]
  };
};
