export const convertHeight = (height, height_unit, target_unit) => {
    if (height_unit === target_unit) {
        return height;
    }
    if (height_unit === 'cm' && target_unit === 'm') {
        return height / 100;
    }
    if (height_unit === 'm' && target_unit === 'cm') {
        return height * 100;
    }
    if (height_unit === 'i' && target_unit === 'm') {
        return height * 0.0254;
    }
    if (height_unit === 'm' && target_unit === 'i') {
        return height / 0.0254;
    }
    if (height_unit === 'i' && target_unit === 'cm') {
        return height * 2.54;
    }
    if (height_unit === 'cm' && target_unit === 'i') {
        return height / 2.54;
    }
    throw new Error(`Unsupported conversion from "${height_unit}" to "${target_unit}"`);
}

export const convertWeight = (weight, weight_unit, target_unit) => {
    if (weight_unit === target_unit) {
        return weight;
    }
    if (weight_unit === 'kg' && target_unit === 'lb') {
        return weight * 2.20462;
    }
    if (weight_unit === 'lb' && target_unit === 'kg') {
        return weight / 2.20462;
    }
    throw new Error(`Unsupported conversion from ${weight_unit} to ${target_unit}`);
}

export const interpretString = (str) => {
    /*
     interprete un string, de tal forma que si es un numero, lo devuelva,
     si tiene solo letras (sin espacios), devuelve la cantidad de letras,
     y si no devuelva la cantidad de palabras sin contar las comas o los puntos.
     */
    if (!isNaN(str)) {
        return Number(str);
    }
    const words = str.replace(/[.,]/g, '').split(' ');
    if (words.length === 1) {
        return words[0].length;
    }
    return words.length;
}

export const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

export const convertCaloriesToUnit = (calories, fromUnit, toUnit = "kcal") => {
    const CALORIE_UNITS = {
        'kcal': 1,
        'kj': 0.239006
    };
    return parseFloat(calories) * CALORIE_UNITS[fromUnit] / CALORIE_UNITS[toUnit];
}