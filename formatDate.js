/**
 * Obtener fechas entre fecha inicial y fecha final, excluyendo fecha inicial
 */

function getDatesBetween(dateCurrent, dateEndt) {
  //console.log(dateCurrent, dateEndt);
  // Almacenar fechas
  const date = [];
  const dateCurrentt = new Date(dateCurrent);
  const dateEndtObj = new Date(dateEndt);
  //let isFirstIteration = true; // Variable para identificar la primera iteración
  while (dateCurrentt < dateEndtObj) {
    // Si es la primera iteración, no agregar la fecha inicial
    date.push(new Date(dateCurrentt));
    dateCurrentt.setDate(dateCurrentt.getDate() + 1);
  }
  console.log(date);
  return date;
}
/**
 *  Verifica si el dia es Sabado,Domingo o Festivo
 */
function isWeekendOrHoliday(date) {
  const day = date.getDay();
  if (day === 0 || day === 6) {
    return true;
  }
  //Dias festivos 2023
  const holidays = [
    new Date(date.getFullYear(), 7, 7), // Año actual, Mes, Dia
    new Date(date.getFullYear(), 7, 21),
    new Date(date.getFullYear(), 9, 16),
    new Date(date.getFullYear(), 10, 6),
    new Date(date.getFullYear(), 10, 13),
    new Date(date.getFullYear(), 11, 8),
    new Date(date.getFullYear(), 11, 25),
    // Agrega más fechas festivas aquí si es necesario
  ];
  // Verificar si es un día festivo
  for (const holiday of holidays) {
    if (date.toDateString() === holiday.toDateString()) {
      return true;
    }
  }
  return false;
}
// Función para calcular los días hábiles entre dos fechas
function getWorkingDays(dateCurrent, dateEndt) {
  const dates = getDatesBetween(dateCurrent, dateEndt);
  const workingDays = dates.filter((date) => !isWeekendOrHoliday(date));
  return workingDays.length;
}

// validacion identificar si es string de fecha o string cualquier cadena
function isDateFormat(value) {
  const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  return dateRegex.test(value);
}
// Funcion reorganizacion de fechas
function changeDateFormat(formatDate) {
  const parts = formatDate.split("/");
  const day = parts[0];
  const month = parts[1];
  const year = parts[2];
  return `${year}-${month}-${day}`;
}
function validationDate(dateCurrentt, dateEndt) {
  if (typeof dateCurrentt === "object" && typeof dateEndt === "string") {
    const isDateformatendt = isDateFormat(dateEndt);
    if (isDateformatendt) {
      const newDateEndt = changeDateFormat(dateEndt);
      const dateEndtOk = new Date(newDateEndt);
      const workingDaysCount = getWorkingDays(dateCurrentt, dateEndtOk);
      return workingDaysCount;
    } else {
      return "No es un formato de fecha";
    }
  } else {
    return "Fecha actual no corresponde a un object date";
  }
}
const dateCurrentt = new Date();
const workingDaysCount = validationDate(dateCurrentt, "10/11/2023");
console.log(`Entrega Estimada: ${workingDaysCount} dias habiles`);
