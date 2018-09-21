use food_database;
db.dropDatabase();

{
    name: "Banana",
    grams: "5",
    details: {
        "uri": "http://www.edamam.com/ontologies/edamam.owl#3ba98227-e936-49f2-8ac8-d6dbd5a9411b",
        "yield": 1.0,
        "calories": 0,
        "totalWeight": 1.0,
        "dietLabels": [
            "LOW_FAT",
            "LOW_SODIUM"
        ],
        "healthLabels": [
            "FAT_FREE",
            "LOW_FAT_ABS",
            "SUGAR_CONSCIOUS",
            "LOW_POTASSIUM",
            "KIDNEY_FRIENDLY",
            "VEGAN",
            "VEGETARIAN",
            "PESCATARIAN",
            "PALEO",
            "SPECIFIC_CARBS",
            "DAIRY_FREE",
            "GLUTEN_FREE",
            "WHEAT_FREE",
            "EGG_FREE",
            "MILK_FREE",
            "PEANUT_FREE",
            "TREE_NUT_FREE",
            "SOY_FREE",
            "FISH_FREE",
            "SHELLFISH_FREE",
            "PORK_FREE",
            "RED_MEAT_FREE",
            "CRUSTACEAN_FREE",
            "CELERY_FREE",
            "MUSTARD_FREE",
            "SESAME_FREE",
            "LUPINE_FREE",
            "MOLLUSK_FREE",
            "ALCOHOL_FREE",
            "NO_OIL_ADDED",
            "NO_SUGAR_ADDED",
            "KOSHER",
            "PLANTRICIOUS",
            "B_HEALTHY"
        ],
        "cautions": [
        ],
        "totalNutrients": {
            "ENERC_KCAL": {
                "label": "Energy",
                "quantity": 0.18,
                "unit": "kcal"
            },
            "FAT": {
                "label": "Fat",
                "quantity": 0.002,
                "unit": "g"
            },
            "FASAT": {
                "label": "Saturated",
                "quantity": 2.8000000000000003E-4,
                "unit": "g"
            },
            "FAMS": {
                "label": "Monounsaturated",
                "quantity": 3.1E-4,
                "unit": "g"
            },
            "FAPU": {
                "label": "Polyunsaturated",
                "quantity": 8.3E-4,
                "unit": "g"
            },
            "CHOCDF": {
                "label": "Carbs",
                "quantity": 0.038900000000000004,
                "unit": "g"
            },
            "FIBTG": {
                "label": "Fiber",
                "quantity": 0.012,
                "unit": "g"
            },
            "SUGAR": {
                "label": "Sugars",
                "quantity": 0.0263,
                "unit": "g"
            },
            "PROCNT": {
                "label": "Protein",
                "quantity": 0.0088,
                "unit": "g"
            },
            "NA": {
                "label": "Sodium",
                "quantity": 0.05,
                "unit": "mg"
            },
            "CA": {
                "label": "Calcium",
                "quantity": 0.1,
                "unit": "mg"
            },
            "MG": {
                "label": "Magnesium",
                "quantity": 0.11,
                "unit": "mg"
            },
            "K": {
                "label": "Potassium",
                "quantity": 2.37,
                "unit": "mg"
            },
            "FE": {
                "label": "Iron",
                "quantity": 0.0027,
                "unit": "mg"
            },
            "ZN": {
                "label": "Zinc",
                "quantity": 0.0017000000000000001,
                "unit": "mg"
            },
            "P": {
                "label": "Phosphorus",
                "quantity": 0.24,
                "unit": "mg"
            },
            "VITA_RAE": {
                "label": "Vitamin A",
                "quantity": 0.42,
                "unit": "µg"
            },
            "VITC": {
                "label": "Vitamin C",
                "quantity": 0.13699999999999998,
                "unit": "mg"
            },
            "THIA": {
                "label": "Thiamin (B1)",
                "quantity": 3.7E-4,
                "unit": "mg"
            },
            "RIBF": {
                "label": "Riboflavin (B2)",
                "quantity": 1.9E-4,
                "unit": "mg"
            },
            "NIA": {
                "label": "Niacin (B3)",
                "quantity": 0.00594,
                "unit": "mg"
            },
            "VITB6A": {
                "label": "Vitamin B6",
                "quantity": 8.0E-4,
                "unit": "mg"
            },
            "FOLDFE": {
                "label": "Folate equivalent (total)",
                "quantity": 0.15,
                "unit": "µg"
            },
            "FOLFD": {
                "label": "Folate (food)",
                "quantity": 0.15,
                "unit": "µg"
            },
            "TOCPHA": {
                "label": "Vitamin E",
                "quantity": 0.0054,
                "unit": "mg"
            },
            "VITK1": {
                "label": "Vitamin K",
                "quantity": 0.079,
                "unit": "µg"
            }
        },
        "totalDaily": {
            "ENERC_KCAL": {
                "label": "Energy",
                "quantity": 0.009,
                "unit": "%"
            },
            "FAT": {
                "label": "Fat",
                "quantity": 0.003076923076923077,
                "unit": "%"
            },
            "FASAT": {
                "label": "Saturated",
                "quantity": 0.0014000000000000002,
                "unit": "%"
            },
            "CHOCDF": {
                "label": "Carbs",
                "quantity": 0.012966666666666668,
                "unit": "%"
            },
            "FIBTG": {
                "label": "Fiber",
                "quantity": 0.048,
                "unit": "%"
            },
            "PROCNT": {
                "label": "Protein",
                "quantity": 0.0176,
                "unit": "%"
            },
            "NA": {
                "label": "Sodium",
                "quantity": 0.0020833333333333333,
                "unit": "%"
            },
            "CA": {
                "label": "Calcium",
                "quantity": 0.01,
                "unit": "%"
            },
            "MG": {
                "label": "Magnesium",
                "quantity": 0.02619047619047619,
                "unit": "%"
            },
            "K": {
                "label": "Potassium",
                "quantity": 0.050425531914893615,
                "unit": "%"
            },
            "FE": {
                "label": "Iron",
                "quantity": 0.015000000000000001,
                "unit": "%"
            },
            "ZN": {
                "label": "Zinc",
                "quantity": 0.015454545454545455,
                "unit": "%"
            },
            "P": {
                "label": "Phosphorus",
                "quantity": 0.03428571428571429,
                "unit": "%"
            },
            "VITA_RAE": {
                "label": "Vitamin A",
                "quantity": 0.04666666666666667,
                "unit": "%"
            },
            "VITC": {
                "label": "Vitamin C",
                "quantity": 0.1522222222222222,
                "unit": "%"
            },
            "THIA": {
                "label": "Thiamin (B1)",
                "quantity": 0.030833333333333334,
                "unit": "%"
            },
            "RIBF": {
                "label": "Riboflavin (B2)",
                "quantity": 0.014615384615384615,
                "unit": "%"
            },
            "NIA": {
                "label": "Niacin (B3)",
                "quantity": 0.037125,
                "unit": "%"
            },
            "VITB6A": {
                "label": "Vitamin B6",
                "quantity": 0.061538461538461535,
                "unit": "%"
            },
            "FOLDFE": {
                "label": "Folate equivalent (total)",
                "quantity": 0.0375,
                "unit": "%"
            },
            "TOCPHA": {
                "label": "Vitamin E",
                "quantity": 0.036000000000000004,
                "unit": "%"
            },
            "VITK1": {
                "label": "Vitamin K",
                "quantity": 0.06583333333333334,
                "unit": "%"
            }
        },
        "ingredients": [
            {
                "parsed": [
                    {
                        "quantity": 1.0,
                        "measure": "gram",
                        "food": "Tomatoes, red, ripe, raw, year round average",
                        "foodId": "food_a15odrqbhfxq2maboskfybtygyxv",
                        "foodURI": "http://www.edamam.com/ontologies/edamam.owl#Food_11529",
                        "weight": 1.0,
                        "retainedWeight": 1.0,
                        "measureURI": "http://www.edamam.com/ontologies/edamam.owl#Measure_gram",
                        "status": "OK"
                    }
                ]
            }
        ]
    }
}