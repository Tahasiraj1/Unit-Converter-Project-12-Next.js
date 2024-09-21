"use client";

import { useState, ChangeEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const conversionRates : Record<string, Record<string, number>> = {
    "length": {
        "Millimeters (mm)": 1,
        "Centimeters (cm)": 10,
        "Meters (m)": 1000,
        "Kilometers (km)": 1000000,
        "Inches (in)": 25.4,
        "Feet (ft)": 304.8,
        "Yards (yd)": 914.4,
        "Miles (mi)": 1609344
    },
    "weight": {
        "Grams (g)": 1,
        "Kilograms (kg)": 1000,
        "Ounces (oz)": 28.3495,
        "Pounds (lb)": 453.592
    },
    "volume": {
        "Milliliters (ml)": 1,
        "Liters (l)": 1000,
        "Fluid Ounces (fl oz)": 29.5735,
        "Cups (cup)": 240,
        "Pints (pt)": 473.176,
        "Quarts (qt)": 946.353,
        "Gallons (gal)": 3785.41
    }
};

const unitTypes: Record<string, string[]> = {
    "length": [
        "Millimeters (mm)",
        "Centimeters (cm)",
        "Meter (m)",
        "Kilometers (km)",
        "Inches (in)",
        "Feet (ft)",
        "Yards (yd)",
        "Miles (mi)"
    ],
    "weight": ["Grams (g)", "Kilograms (kg)", "Ounces (oz)", "Pounds (lb)"],
    "volume": [
        "Milliliters (ml)",
        "Liters (l)",
        "Fluid Ounces (fl oz)",
        "Cups (cup)",
        "Pints (pt)",
        "Quarts (qt)",
        "Gallons (gal)"
    ],
};


export default function UnitConverter() {
    const [inputValue, setInputValue] = useState<number | null>(null);
    const [inputUnit, setInputUnit] = useState<string | null>(null);
    const [outputUnit, setOutputUnit] = useState<string | null>(null);
    const [convertedValue, setConvertedValue] = useState<number | null>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setInputValue(parseFloat(e.target.value));
    };

    const handleInputUnitChange = (value: string): void => {
        setInputUnit(value);
    };

    const handleOutputUnitChange = (value: string): void => {
        setOutputUnit(value);
    };

    const convertValue = (): void => {
        if (inputValue !== null && inputUnit && outputUnit) {
            let unitCategory: string | null = null;

            for (const category in unitTypes) {
                if (
                    unitTypes[category].includes(inputUnit) &&
                    unitTypes[category].includes(outputUnit)
                ) {
                    unitCategory = category;
                    break;
                }
            }
            if (unitCategory) {
                const baseValue = inputValue * conversionRates[unitCategory][inputUnit];
                const result = baseValue / conversionRates[unitCategory][outputUnit];
                setConvertedValue(result);
            } else {
                setConvertedValue(null);
                alert("Incompatible unit types selected.");
            }
        } else {
            setConvertedValue(null);
            alert("Please fill all fields.")
        }
    };

    return (
        <div className="p-4 sm:p-8 flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-300 via-orange-200 to-yellow-200 dark:bg-gray-900">
            <div className="text-black max-w-md w-full p-6 bg-white/90 rounded-3xl shadow-2xl">
                <h1 className="text-2xl font-bold mb-1 text-center">Unit Converter</h1>
                <p className="mb-8 text-center">
                    Convert values between different units.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Select for input unit */}
                    <div className="space-y-2 w-48">
                        <Label htmlFor="input-unit">From</Label>
                        <Select onValueChange={handleInputUnitChange}>
                            <SelectTrigger className="rounded-3xl border-2 border-gray-300 focus:border-gray-500">
                                <SelectValue placeholder="Select Unit" />
                            </SelectTrigger>
                            <SelectContent className="shadow-xl max-h-[300px] pb-2 rounded-3xl bg-gradient-to-br from-orange-100 via-orange-100 to-yellow-100">
                                {Object.entries(unitTypes).map(([category, units]) => (
                                    <SelectGroup key={category}>
                                        <SelectLabel>
                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                        </SelectLabel>
                                        {units.map((unit) => (
                                            <SelectItem key={unit} value={unit}>
                                                {unit}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {/* Select for output unit */}
                    <div className="space-y-2 w-48">
                        <Label htmlFor="output-unit">To</Label>
                        <Select onValueChange={handleOutputUnitChange}>
                            <SelectTrigger className="rounded-3xl border-2 border-gray-300 focus:border-gray-500">
                                <SelectValue placeholder="Select Unit" />
                            </SelectTrigger>
                            <SelectContent className="shadow-xl max-h-[300px] pb-2 rounded-3xl bg-gradient-to-br from-orange-100 via-orange-100 to-yellow-100">
                                {Object.entries(unitTypes).map(([category, units]) => (
                                    <SelectGroup key={category}>
                                        <SelectLabel>
                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                        </SelectLabel>
                                        {units.map((unit) => (
                                            <SelectItem key={unit} value={unit}>
                                                {unit}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {/* Input for value to convert */}
                    <div className="space-y-2 col-span-2">
                        <Label htmlFor="input-value">Value</Label>
                        <Input
                        id="input-value"
                        type="number"
                        placeholder="Enter value"
                        value={inputValue || ""}
                        onChange={handleInputChange}
                        className="w-full border-2 border-gray-300 rounded-3xl"
                        />
                    </div>
                    {/* Button to trigger conversion */}
                    <Button
                    type="button"
                    className="rounded-3xl active:scale-95 transition-transform duration:100 col-span-2 bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-1 focus-visible:ring"
                    onClick={convertValue}
                    >
                        Convert
                    </Button>
                </div>
                {/* Display the converted value */}
                <div className="mt-6 text-center">
                    <div className="text-4xl font-bold animate-in zoom-in duration-700">
                        {convertedValue !== null ? convertedValue.toFixed(2) : '0'}
                    </div>
                    <div className="text-muted-foreground text-lg">
                        {outputUnit ? outputUnit : "Unit"}
                    </div>
                </div>
            </div>
        </div>
    )
}