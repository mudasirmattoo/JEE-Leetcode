
const questionsData = [
    // Shuffled entries with sequential IDs
    { 
        id: 1, 
        title: "Which of the following has the highest dipole moment?",
        topic: "Organic Chemistry",
        difficulty: "Medium",
        options: ["Benzene", "Phenol", "Chlorobenzene", "Nitrobenzene"],
        answer: "Nitrobenzene"
    },
    {
        id: 2,
        title: "What is the color of FeSO4 solution?",
        topic: "Inorganic Chemistry",
        difficulty: "Easy",
        options: ["Green", "Blue", "Yellow", "Colorless"],
        answer: "Green"
    },
    {
        id: 3,
        title: "Which thermodynamic law is the basis for the calculation of entropy changes?",
        topic: "Physical Chemistry",
        difficulty: "Medium",
        options: ["First law", "Second law", "Third law", "Zeroth law"],
        answer: "Second law"
    },
    {
        id: 4,
        title: "What is the product of the ozonolysis of ethene?",
        topic: "Organic Chemistry",
        difficulty: "Medium",
        options: ["Formaldehyde", "Acetaldehyde", "Acetic acid", "Methanol"],
        answer: "Formaldehyde"
    },
    {
        id: 5,
        title: "Which of the following is an amphoteric oxide?",
        topic: "Inorganic Chemistry",
        difficulty: "Easy",
        options: ["Na2O", "Al2O3", "SiO2", "SO2"],
        answer: "Al2O3"
    },
    {
        id: 6,
        title: "What is the value of the gas constant R in SI units?",
        topic: "Physical Chemistry",
        difficulty: "Medium",
        options: ["0.0821 atm·L/mol·K", "8.314 J/mol·K", "1.987 cal/mol·K", "62.4 L·mmHg/mol·K"],
        answer: "8.314 J/mol·K"
    },
    {
        id: 7,
        title: "Which compound is known as 'laughing gas'?",
        topic: "Inorganic Chemistry",
        difficulty: "Easy",
        options: ["CO2", "NO", "N2O", "NH3"],
        answer: "N2O"
    },
    {
        id: 8,
        title: "What is the main component of natural gas?",
        topic: "Inorganic Chemistry",
        difficulty: "Easy",
        options: ["Methane", "Ethane", "Propane", "Butane"],
        answer: "Methane"
    },
    {
        id: 9,
        title: "What is the IUPAC name of CH3CH=CH2?",
        topic: "Organic Chemistry",
        difficulty: "Easy",
        options: ["Propene", "Propyne", "Propane", "Ethylene"],
        answer: "Propene"
    },
    {
        id: 10,
        title: "Which of the following has the lowest entropy?",
        topic: "Physical Chemistry",
        difficulty: "Easy",
        options: ["Ice", "Liquid water", "Water vapor", "All have equal entropy"],
        answer: "Ice"
    },
    {
        id: 11,
        title: "Which element is essential for the formation of chlorophyll?",
        topic: "Inorganic Chemistry",
        difficulty: "Easy",
        options: ["Iron", "Magnesium", "Calcium", "Zinc"],
        answer: "Magnesium"
    },
    {
        id: 12,
        title: "What is the hybridization of the carbon atom in methane?",
        topic: "Organic Chemistry",
        difficulty: "Easy",
        options: ["sp3", "sp2", "sp", "None"],
        answer: "sp3"
    },
    {
        id: 13,
        title: "Which is not a colligative property?",
        topic: "Physical Chemistry",
        difficulty: "Easy",
        options: ["Boiling point elevation", "Freezing point depression", "Vapor pressure lowering", "Molarity"],
        answer: "Molarity"
    },
    {
        id: 14,
        title: "What is the major product in the nitration of benzene?",
        topic: "Organic Chemistry",
        difficulty: "Medium",
        options: ["Nitrobenzene", "Phenol", "Benzoic acid", "Aniline"],
        answer: "Nitrobenzene"
    },
    {
        id: 15,
        title: "What is the atomic number of calcium?",
        topic: "Inorganic Chemistry",
        difficulty: "Easy",
        options: ["20", "18", "16", "22"],
        answer: "20"
    },
    {
        id: 16,
        title: "Which of the following elements has the highest atomic radius?",
        topic: "Inorganic Chemistry",
        difficulty: "Medium",
        options: ["Oxygen", "Sodium", "Sulfur", "Chlorine"],
        answer: "Sodium"
    },
    {
        id: 17,
        title: "For a zero-order reaction, the rate is:",
        topic: "Physical Chemistry",
        difficulty: "Easy",
        options: ["Independent of concentration", "Directly proportional to concentration", "Inversely proportional to concentration", "None of these"],
        answer: "Independent of concentration"
    },
    {
        id: 18,
        title: "Which of the following compounds is aromatic?",
        topic: "Organic Chemistry",
        difficulty: "Medium",
        options: ["Cyclohexane", "Benzene", "Cyclobutene", "Cyclopropane"],
        answer: "Benzene"
    },
    {
        id: 19,
        title: "What is the oxidation state of sulfur in H2SO4?",
        topic: "Inorganic Chemistry",
        difficulty: "Medium",
        options: ["+6", "+4", "+2", "0"],
        answer: "+6"
    },
    {
        id: 20,
        title: "Which equation represents the relationship between Gibbs free energy and the equilibrium constant?",
        topic: "Physical Chemistry",
        difficulty: "Medium",
        options: ["ΔG° = -RT ln K", "ΔG° = RT ln K", "ΔG = ΔH - TΔS", "None of these"],
        answer: "ΔG° = -RT ln K"
    },
    {
        id: 21,
        title: "What is the SI unit of entropy?",
        topic: "Physical Chemistry",
        difficulty: "Medium",
        options: ["J·mol^-1·K^-1", "cal·mol^-1", "J·mol^-1", "K·mol^-1"],
        answer: "J·mol^-1·K^-1"
    },
    {
        id: 22,
        title: "Which of the following compounds will not undergo electrophilic aromatic substitution?",
        topic: "Organic Chemistry",
        difficulty: "Medium",
        options: ["Benzene", "Chlorobenzene", "Nitrobenzene", "Toluene"],
        answer: "Nitrobenzene"
    },
    {
        id: 23,
        title: "What is the pH of pure water?",
        topic: "Inorganic Chemistry",
        difficulty: "Easy",
        options: ["7", "14", "0", "3"],
        answer: "7"
    },
    {
        id: 24,
        title: "Which equation defines the relationship between the vapor pressure and temperature of a liquid?",
        topic: "Physical Chemistry",
        difficulty: "Medium",
        options: ["Clausius-Clapeyron equation", "Arrhenius equation", "Boyle's law", "Dalton's law"],
        answer: "Clausius-Clapeyron equation"
    },
    {
        id: 25,
        title: "Which element in the periodic table has the highest electronegativity?",
        topic: "Inorganic Chemistry",
        difficulty: "Easy",
        options: ["Oxygen", "Fluorine", "Chlorine", "Nitrogen"],
        answer: "Fluorine"
    },
    {
        id: 26,
        title: "What is the mechanism of the reaction between alkyl halides and KOH in alcoholic solution?",
        topic: "Organic Chemistry",
        difficulty: "Hard",
        options: ["SN1", "SN2", "E1", "E2"],
        answer: "E2"
    },
    {
        id: 27,
        title: "What is the shape of PCl5 molecule?",
        topic: "Inorganic Chemistry",
        difficulty: "Medium",
        options: ["Tetrahedral", "Trigonal bipyramidal", "Octahedral", "Square planar"],
        answer: "Trigonal bipyramidal"
    },
    {
        id: 28,
        title: "Which gas is used in the Haber process?",
        topic: "Inorganic Chemistry",
        difficulty: "Medium",
        options: ["Oxygen", "Nitrogen", "Hydrogen", "Methane"],
        answer: "Nitrogen"
    },
    {
        id: 29,
        title: "What is the common oxidation state of lanthanides?",
        topic: "Inorganic Chemistry",
        difficulty: "Hard",
        options: ["+3", "+2", "+4", "+1"],
        answer: "+3"
    },
    {
        id: 30,
        title: "Which of the following is a noble gas?",
        topic: "Inorganic Chemistry",
        difficulty: "Easy",
        options: ["Neon", "Oxygen", "Nitrogen", "Chlorine"],
        answer: "Neon"
    },
    {
        id: 31,
        title: "What type of isomerism is shown by 1-butanol and diethyl ether?",
        topic: "Organic Chemistry",
        difficulty: "Medium",
        options: ["Functional isomerism", "Geometrical isomerism", "Optical isomerism", "Chain isomerism"],
        answer: "Functional isomerism"
    },
    {
        id: 32,
        title: "Which element is known as the 'King of the elements'?",
        topic: "Inorganic Chemistry",
        difficulty: "Medium",
        options: ["Carbon", "Oxygen", "Nitrogen", "Silicon"],
        answer: "Carbon"
    },
    {
        id: 33,
        title: "Which of the following has the highest boiling point?",
        topic: "Physical Chemistry",
        difficulty: "Easy",
        options: ["Water", "Methane", "Ethanol", "Diethyl ether"],
        answer: "Water"
    },
    {
        id: 34,
        title: "Which of the following is the hardest known natural substance?",
        topic: "Inorganic Chemistry",
        difficulty: "Easy",
        options: ["Graphite", "Diamond", "Quartz", "Silica"],
        answer: "Diamond"
    },
    {
        id: 35,
        title: "Which of the following compounds is used as an antacid?",
        topic: "Inorganic Chemistry",
        difficulty: "Medium",
        options: ["NaCl", "NaOH", "Na2CO3", "NaHCO3"],
        answer: "NaHCO3"
    },
    {
        id: 36,
        title: "What is the ideal gas equation?",
        topic: "Physical Chemistry",
        difficulty: "Easy",
        options: ["PV = nRT", "PV = k", "P = Vn", "RT = nP"],
        answer: "PV = nRT"
    },
    {
        id: 37,
        title: "Which of the following compounds is an example of an enol?",
        topic: "Organic Chemistry",
        difficulty: "Medium",
        options: ["Acetone", "Ethanol", "Acetaldehyde", "Vinyl alcohol"],
        answer: "Vinyl alcohol"
    },
    {
        id: 38,
        title: "Which of the following is the most abundant gas in the Earth's atmosphere?",
        topic: "Inorganic Chemistry",
        difficulty: "Easy",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
        answer: "Nitrogen"
    },
    {
        id: 39,
        title: "What is the term for the heat required to raise the temperature of one mole of a substance by one degree Celsius?",
        topic: "Physical Chemistry",
        difficulty: "Medium",
        options: ["Enthalpy", "Entropy", "Specific heat", "Molar heat capacity"],
        answer: "Molar heat capacity"
    },
    {
        id: 40,
        title: "Which metal is commonly used in the construction of aircraft bodies?",
        topic: "Inorganic Chemistry",
        difficulty: "Medium",
        options: ["Aluminum", "Iron", "Copper", "Titanium"],
        answer: "Aluminum"
    },
    {
        id: 41,
        title: "Which of the following is not an aromatic compound?",
        topic: "Organic Chemistry",
        difficulty: "Medium",
        options: ["Cyclohexene", "Benzene", "Toluene", "Napthalene"],
        answer: "Cyclohexene"
    },
    {
        id: 42,
        title: "Which of the following elements is a liquid at room temperature?",
        topic: "Inorganic Chemistry",
        difficulty: "Medium",
        options: ["Mercury", "Sodium", "Bromine", "Phosphorus"],
        answer: "Mercury"
    },
    {
        id: 43,
        title: "Which of the following reactions is exothermic?",
        topic: "Physical Chemistry",
        difficulty: "Medium",
        options: ["Combustion of methane", "Melting of ice", "Evaporation of water", "Electrolysis of water"],
        answer: "Combustion of methane"
    },
    {
        id: 44,
        title: "What is the shape of the graph between ln k and 1/T for a chemical reaction?",
        topic: "Physical Chemistry",
        difficulty: "Medium",
        options: ["Parabola", "Hyperbola", "Straight line", "Circular"],
        answer: "Straight line"
    },
    {
        id: 45,
        title: "What does the van 't Hoff factor (i) signify in colligative properties?",
        topic: "Physical Chemistry",
        difficulty: "Medium",
        options: ["The ratio of moles of solute to solvent", "The ratio of observed to expected colligative property values", "The degree of ionization of solute", "None of these"],
        answer: "The ratio of observed to expected colligative property values"
    },
    {
        id: 46,
        title: "What is the significance of Hess's Law?",
        topic: "Physical Chemistry",
        difficulty: "Medium",
        options: ["Heat change is path-dependent", "Heat change depends only on initial and final states", "Heat is proportional to pressure", "Heat does not depend on temperature"],
        answer: "Heat change depends only on initial and final states"
    },
    {
        id: 47,
        title: "What is the major product when ethyl bromide reacts with alcoholic KOH?",
        topic: "Organic Chemistry",
        difficulty: "Medium"
    }
]

export default questionsData