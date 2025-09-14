function isLetter(ch) {
    return /^[a-zA-Z\s]$/.test(ch); // allows spaces in names
}

function validateForm() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();

    let nameError = document.getElementById("nameError");
    let emailError = document.getElementById("emailError");
    let phoneError = document.getElementById("phoneError");

    nameError.innerHTML = "";
    emailError.innerHTML = "";
    phoneError.innerHTML = "";

    let valid = true;

    // Name validation
    if (name === "") {
        nameError.innerHTML = "Name can't be empty";
        valid = false;
    } else {
        for (let i = 0; i < name.length; i++) {
            if (!isLetter(name[i])) {
                nameError.innerHTML = "Name must contain only alphabets and spaces";
                valid = false;
                break;
            }
        }
    }

    // Email validation
    if (email === "") {
        emailError.innerHTML = "Email can't be empty";
        valid = false;
    } else {
        let atCount = (email.match(/@/g) || []).length;
        let atIndex = email.indexOf("@");
        let dotIndex = email.lastIndexOf(".");

        if (atCount !== 1) {
            emailError.innerHTML = "Email must have exactly one @";
            valid = false;
        } else if (atIndex === 0 || atIndex === email.length - 1) {
            emailError.innerHTML = "Email can't start or end with @";
            valid = false;
        } else if (dotIndex === -1 || dotIndex === 0 || dotIndex === email.length - 1) {
            emailError.innerHTML = "Invalid dot (.) placement in email";
            valid = false;
        } else if (Math.abs(dotIndex - atIndex) <= 1) {
            emailError.innerHTML = "There must be at least one character between @ and .";
            valid = false;
        }
    }

    // Phone number validation
    if (phone === "") {
        phoneError.innerHTML = "Phone number can't be empty";
        valid = false;
    } else if (!/^\d{10}$/.test(phone)) {
        phoneError.innerHTML = "Phone number must be exactly 10 digits";
        valid = false;
    }

    return valid;
}

function saveFormData() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let discovery = document.getElementById("discovery").value;
    let type = document.getElementById("type").value;
    let message = document.getElementById("message").value.trim();
    let rating = document.querySelector('input[name="rating"]:checked')?.value;
    let recommend = document.querySelector('input[name="recommend"]:checked')?.value;
    let notify = document.querySelector('input[name="notify"]')?.checked;
    let anonymous = document.querySelector('input[name="anonymous"]')?.checked;

    const feedbackData = {
        name,
        email,
        phone,
        discovery,
        type,
        message,
        rating,
        recommend,
        notify,
        anonymous,
        timestamp: new Date().toISOString()
    };

    let existingFeedback = JSON.parse(localStorage.getItem("feedbacks")) || [];
    existingFeedback.push(feedbackData);
    localStorage.setItem("feedbacks", JSON.stringify(existingFeedback));

    alert("Feedback submitted successfully!");
    clearForm();
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("discovery").value = "search";
    document.getElementById("type").value = "suggestion";
    document.getElementById("message").value = "";
    document.querySelectorAll('input[name="rating"]').forEach(input => input.checked = false);
    document.querySelectorAll('input[name="recommend"]').forEach(input => input.checked = false);
    document.querySelectorAll('input[name="notify"]').forEach(input => input.checked = false);
    document.querySelectorAll('input[name="anonymous"]').forEach(input => input.checked = false);
}
//F12 --> Session Storage for key value pairs in form