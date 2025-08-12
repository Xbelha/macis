<?php
// This script acts as a proxy to hide your Web3Forms access key.

// 1. Check if the form was submitted using POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 2. Set your secret Web3Forms access key here
    $web3forms_access_key = "79544b58-7514-48c4-b80a-4d85b6e9eb87";

    // 3. Add your access key to the form data
    $_POST['access_key'] = $web3forms_access_key;

    // 4. Get the form submission data from your form
    $formData = $_POST;

    // 5. Send the data to Web3Forms using cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://api.web3forms.com/submit");
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($formData));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // 6. Execute the request and get the response
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    // 7. Optional: Redirect the user to a "thank you" page
    // You should create a simple "thank-you.html" page for this.
    if ($http_code == 200) {
        header("Location: /thank-you.html"); // Create this page!
    } else {
        // Or handle the error
        echo "Sorry, there was an error submitting your order.";
    }

} else {
    // Not a POST request, so redirect to the homepage or show an error
    header("Location: /");
    exit;
}
?>