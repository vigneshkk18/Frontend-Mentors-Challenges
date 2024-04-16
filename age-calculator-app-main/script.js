const inputGroups = document.querySelectorAll("input.input-group");
const ageCalculateButton = document.querySelector("button.age-action__button");

const dateInputGroup = document.querySelector('[data-input-group-id="date"]');
const monthInputGroup = document.querySelector('[data-input-group-id="month"]');
const yearInputGroup = document.querySelector('[data-input-group-id="year"]');

const getDOB = () => ({
  date: +document.getElementById("date").value.trim(),
  month: +document.getElementById("month").value.trim(),
  year: +document.getElementById("year").value.trim(),
});

const setError = (groupId, isError, message) => {
  const inputGroup = document.querySelector(
    `.input-group[data-input-group-id="${groupId}"]`
  );
  inputGroup.setAttribute("data-error", isError);
  const errorEl = inputGroup.querySelector(".input-group__error");
  if (errorEl) errorEl.innerText = isError ? message : "";
};

const setResultValue = (groupId, value) => {
  const valEl = document.querySelector(
    `[data-result-group-id="${groupId}"] .age-result__row__value`
  );
  if (valEl) valEl.innerText = value;
};

const validateDOB = (dob) => {
  let isValid = true;
  if (isNaN(dob.date) || dob.date < 1 || dob.date > 31) {
    setError("date", true, "Must be a valid day");
    isValid = false;
  } else {
    setError("date", false);
  }
  if (isNaN(dob.month) || dob.month < 1 || dob.month > 12) {
    setError("month", true, "Must be a valid month");
    isValid = false;
  } else {
    setError("month", false);
  }

  const isInvalidDate = isNaN(new Date(`${dob.year}/${dob.month}/${dob.date}`));
  let isInvalidYear = false;
  if ((isInvalidDate && !dob.year) || isNaN(dob.year) || dob.year < 1) {
    setError("year", true, "Must be a valid year");
    isValid = false;
    isInvalidYear = true;
  } else {
    setError("year", false);
  }

  const currentYear = new Date().getFullYear();
  if (!isInvalidYear) {
    if (dob.year > currentYear) {
      setError("year", true, "Must be in the past");
      isValid = false;
    } else {
      setError("year", false);
    }
  }

  return isValid;
};

const updateAgeResult = (dob) => {
  const enteredDate = new Date(`${dob.year}/${dob.month}/${dob.date}`);
  const currDate = new Date();

  const daysDifference = (currDate - enteredDate) / (1000 * 60 * 60 * 24);

  const year = Math.floor(daysDifference / 365);
  const month = Math.floor((daysDifference % 365) / 30);
  const day = Math.floor((daysDifference % 365) % 30);

  setResultValue("year", year);
  setResultValue("month", month);
  setResultValue("date", day);
};

ageCalculateButton.addEventListener("click", () => {
  const dob = getDOB();

  const isValid = validateDOB(dob);
  if (!isValid) {
    Object.keys(dob).forEach((groupId) => {
      setResultValue(groupId, "--");
    });
    return;
  }

  updateAgeResult(dob);
});
