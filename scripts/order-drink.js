document.addEventListener("DOMContentLoaded", function() {
    // Fetch fruit options from the specified web service
    fetch("./")
        .then(response => response.json())
        .then(data => {
            // Populate the select inputs with fruit options
            const fruitSelects = document.querySelectorAll("select[id^='fruit']");
            fruitSelects.forEach(select => {
                data.forEach(fruit => {
                    const option = document.createElement("option");
                    option.value = fruit.name;
                    option.text = fruit.name;
                    select.add(option);
                });
            });
        })
        .catch(error => console.error("Error fetching fruit options:", error));
        document.addEventListener("DOMContentLoaded", function() {
            // Get order details from URL parameters
            const urlParams = new URLSearchParams(window.location.search);
            const firstName = urlParams.get("firstName");
            const email = urlParams.get("email");
            const phone = urlParams.get("phone");
            const fruit1 = urlParams.get("fruit1");
            const fruit2 = urlParams.get("fruit2");
            const fruit3 = urlParams.get("fruit3");
            const specialInstructions = urlParams.get("specialInstructions");
        
            // Populate order details on the page
            const orderDetails = document.getElementById("orderDetails");
            orderDetails.innerHTML = `
                <p><strong>Name:</strong> ${firstName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Fruit 1:</strong> ${fruit1}</p>
                <p><strong>Fruit 2:</strong> ${fruit2}</p>
                <p><strong>Fruit 3:</strong> ${fruit3}</p>
                <p><strong>Special Instructions:</strong> ${specialInstructions || "None"}</p>
            `;
        
            // Fetch nutritional information for selected fruits and calculate totals
            const fruits = [fruit1, fruit2, fruit3];
            let totalCarbs = 0, totalProtein = 0, totalFat = 0, totalSugar = 0, totalCalories = 0;
        
            fruits.forEach(fruit => {
                fetch(`https://www.fruityvice.com/api/fruit/${fruit}`)
                    .then(response => response.json())
                    .then(data => {
                        totalCarbs += data.nutrition.carbohydrates;
                        totalProtein += data.nutrition.protein;
                        totalFat += data.nutrition.fat;
                        totalSugar += data.nutrition.sugar;
                        totalCalories += data.nutrition.calories;
        
                        // Update totals on the page
                        const totals = document.createElement("div");
                        totals.innerHTML = `
                            <p><strong>Total Carbohydrates:</strong> ${totalCarbs.toFixed(2)} g</p>
                            <p><strong>Total Protein:</strong> ${totalProtein.toFixed(2)} g</p>
                            <p><strong>Total Fat:</strong> ${totalFat.toFixed(2)} g</p>
                            <p><strong>Total Sugar:</strong> ${totalSugar.toFixed(2)} g</p>
                            <p><strong>Total Calories:</strong> ${totalCalories.toFixed(2)} kcal</p>
                        `;
                        orderDetails.appendChild(totals);
                    })
                    .catch(error => console.error("Error fetching nutritional information:", error));
            });
        });
        
        function leaveReview() {
            // Implement your logic to redirect or open a link for leaving a review on social media
            // For example, you can redirect to a review platform or open a review form
            alert("Thank you for your order! Please consider leaving a review on social media.");
        }
        document.addEventListener("DOMContentLoaded", function() {
            // Get the last modified date of the page
            const lastModifiedElement = document.getElementById("lastModified");
            const lastModifiedDate = document.lastModified;
            lastModifiedElement.innerText = "Page last modified: " + lastModifiedDate;
        });
});