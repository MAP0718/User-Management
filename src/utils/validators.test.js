import { validateForm } from './validators';

const testValidation = () => {
    const emptyData = { firstName: '', lastName: '', email: '', department: '' };
    const errors = validateForm(emptyData);
    
    if (errors.firstName === "First Name is required") {
        console.log("Test Passed: Validation caught empty name.");
    } else {
        console.log("Test Failed: Validation missed empty name.");
    }
};
