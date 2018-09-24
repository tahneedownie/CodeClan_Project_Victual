use food_database;
db.dropDatabase();
db.user_food_items.insertMany(
    [
        {
            "name": "banana",
            "amount": "1",
            "measurement": "gram",
            "date": "2018-09-22",
            "details": {
                "ENERC_KCAL": {
                    "label": "Energy",
                    "quantity": 0.0445,
                    "unit": "%"
                },
                "FAT": {
                    "label": "Fat",
                    "quantity": 0.005076923076923077,
                    "unit": "%"
                },
                "FASAT": {
                    "label": "Saturated",
                    "quantity": 0.005600000000000001,
                    "unit": "%"
                },
                "CHOCDF": {
                    "label": "Carbs",
                    "quantity": 0.07613333333333333,
                    "unit": "%"
                },
                "FIBTG": {
                    "label": "Fiber",
                    "quantity": 0.10400000000000001,
                    "unit": "%"
                },
                "PROCNT": {
                    "label": "Protein",
                    "quantity": 0.0218,
                    "unit": "%"
                },
                "NA": {
                    "label": "Sodium",
                    "quantity": 0.0004166666666666667,
                    "unit": "%"
                },
                "CA": {
                    "label": "Calcium",
                    "quantity": 0.005,
                    "unit": "%"
                },
                "MG": {
                    "label": "Magnesium",
                    "quantity": 0.06428571428571428,
                    "unit": "%"
                },
                "K": {
                    "label": "Potassium",
                    "quantity": 0.07617021276595745,
                    "unit": "%"
                },
                "FE": {
                    "label": "Iron",
                    "quantity": 0.014444444444444446,
                    "unit": "%"
                },
                "ZN": {
                    "label": "Zinc",
                    "quantity": 0.013636363636363636,
                    "unit": "%"
                },
                "P": {
                    "label": "Phosphorus",
                    "quantity": 0.03142857142857143,
                    "unit": "%"
                },
                "VITA_RAE": {
                    "label": "Vitamin A",
                    "quantity": 0.0033333333333333335,
                    "unit": "%"
                },
                "VITC": {
                    "label": "Vitamin C",
                    "quantity": 0.09666666666666666,
                    "unit": "%"
                },
                "THIA": {
                    "label": "Thiamin (B1)",
                    "quantity": 0.025833333333333333,
                    "unit": "%"
                },
                "RIBF": {
                    "label": "Riboflavin (B2)",
                    "quantity": 0.05615384615384615,
                    "unit": "%"
                },
                "NIA": {
                    "label": "Niacin (B3)",
                    "quantity": 0.0415625,
                    "unit": "%"
                },
                "VITB6A": {
                    "label": "Vitamin B6",
                    "quantity": 0.2823076923076923,
                    "unit": "%"
                },
                "FOLDFE": {
                    "label": "Folate equivalent (total)",
                    "quantity": 0.05,
                    "unit": "%"
                },
                "TOCPHA": {
                    "label": "Vitamin E",
                    "quantity": 0.006666666666666667,
                    "unit": "%"
                },
                "VITK1": {
                    "label": "Vitamin K",
                    "quantity": 0.004166666666666667,
                    "unit": "%"
                }
            }
        },
        {
            "name": "banana",
            "amount": "1",
            "measurement": "serving",
            "date": "2018-09-23",
            "details": {
                "ENERC_KCAL": {
                    "label": "Energy",
                    "quantity": 5.607,
                    "unit": "%"
                },
                "FAT": {
                    "label": "Fat",
                    "quantity": 0.6396923076923077,
                    "unit": "%"
                },
                "FASAT": {
                    "label": "Saturated",
                    "quantity": 0.7056,
                    "unit": "%"
                },
                "CHOCDF": {
                    "label": "Carbs",
                    "quantity": 9.5928,
                    "unit": "%"
                },
                "FIBTG": {
                    "label": "Fiber",
                    "quantity": 13.104000000000001,
                    "unit": "%"
                },
                "PROCNT": {
                    "label": "Protein",
                    "quantity": 2.746800000000001,
                    "unit": "%"
                },
                "NA": {
                    "label": "Sodium",
                    "quantity": 0.0525,
                    "unit": "%"
                },
                "CA": {
                    "label": "Calcium",
                    "quantity": 0.63,
                    "unit": "%"
                },
                "MG": {
                    "label": "Magnesium",
                    "quantity": 8.100000000000001,
                    "unit": "%"
                },
                "K": {
                    "label": "Potassium",
                    "quantity": 9.597446808510638,
                    "unit": "%"
                },
                "FE": {
                    "label": "Iron",
                    "quantity": 1.8199999999999998,
                    "unit": "%"
                },
                "ZN": {
                    "label": "Zinc",
                    "quantity": 1.718181818181818,
                    "unit": "%"
                },
                "P": {
                    "label": "Phosphorus",
                    "quantity": 3.96,
                    "unit": "%"
                },
                "VITA_RAE": {
                    "label": "Vitamin A",
                    "quantity": 0.42,
                    "unit": "%"
                },
                "VITC": {
                    "label": "Vitamin C",
                    "quantity": 12.18,
                    "unit": "%"
                },
                "THIA": {
                    "label": "Thiamin (B1)",
                    "quantity": 3.255,
                    "unit": "%"
                },
                "RIBF": {
                    "label": "Riboflavin (B2)",
                    "quantity": 7.075384615384614,
                    "unit": "%"
                },
                "NIA": {
                    "label": "Niacin (B3)",
                    "quantity": 5.236875,
                    "unit": "%"
                },
                "VITB6A": {
                    "label": "Vitamin B6",
                    "quantity": 35.57076923076923,
                    "unit": "%"
                },
                "FOLDFE": {
                    "label": "Folate equivalent (total)",
                    "quantity": 6.3,
                    "unit": "%"
                },
                "TOCPHA": {
                    "label": "Vitamin E",
                    "quantity": 0.84,
                    "unit": "%"
                },
                "VITK1": {
                    "label": "Vitamin K",
                    "quantity": 0.525,
                    "unit": "%"
                }
            }
        }
    ]);
