const NutrientRDA = function(){}

NutrientRDA.nutrients = {
    Cholesterol: {
        shortHand: "CHOLE",
        RDA: 300
    },
    Energy: {
        shortHand: "ENERC_KCAL",
        RDA: 2200
    },
    "Folic Acid": {
        shortHand: "FOLDFE",
        RDA: 400
    },
    Sugars: {
        shortHand: "SUGAR",
        RDA: 26
    },
    Carbs: {
        shortHand: "CHOCDF",
        RDA: 300
    },
    Fat: {
        shortHand: "FAT",
        RDA: 66
    },
    Fiber: {
        shortHand: "FIBTG",
        RDA: 26
    },
    Protein: {
        shortHand: "PROCNT",
        RDA: 50
    },
    Calcium: {
        shortHand: "CA",
        RDA: 1000
    },
    Iron: {
        shortHand: "FE",
        RDA: 18
    },
    Potassium: {
        shortHand: "K",
        RDA: 3500
    },
    Magnesium: {
        shortHand: "MG",
        RDA: 400
    },
    Sodium: {
        shortHand: "NA",
        RDA: 2400
    },
    "Niacin (B3)": {
        shortHand: "NIA",
        RDA: 20
    },
    Phosphorus: {
        shortHand: "P",
        RDA: 700
    },
    "Riboflavin (B2)": {
        shortHand: "RIBHF",
        RDA: 2
    },
    "Thiamin (B1)": {
        shortHand: "THIA",
        RDA: 2
    },
    "Vitamin E": {
        shortHand: "TOCPHA",
        RDA: 20
    },
    "Vitamin A": {
        shortHand: "VITA_RAE",
        RDA: 900
    },
    "Vitamin B6": {
        shortHand: "VITB6A",
        RDA: 2
    },
    "Vitamin C": {
        shortHand: "VITC",
        RDA: 60
    },
    "Vitamin K": {
        shortHand: "VITK1",
        RDA: 80
    },
    "Vitamin D": {
        shortHand: "VITD",
        RDA: 16
    },
    "Vitamin B12": {
        shortHand: "VITB12",
        RDA: 2
    },
    Zinc: {
        shortHand: "ZN",
        RDA: 16
    }
}



module.exports = NutrientRDA;