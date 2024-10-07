const decreaseButtons = document.querySelectorAll('.decrease');
        const increaseButtons = document.querySelectorAll('.increase');
        const quantityInputs = document.querySelectorAll('.quantity');
        const totalPrices = document.querySelectorAll('.total-price');
        const totalAmountElement = document.getElementById('total-amount'); // Thẻ hiển thị tổng thanh toán
        const unitPrices = [1200000]; // Giả sử đây là giá từng sản phẩm (có thể thay đổi theo sản phẩm)

        // Hàm để tính tổng thanh toán
        function calculateTotal() {
            let total = 0;
            totalPrices.forEach((price) => {
                total += parseInt(price.textContent.replace(/₫|,/g, '')) || 0;
            });
            totalAmountElement.textContent = `₫${total.toLocaleString()}`; // Cập nhật tổng thanh toán
        }

        // Sự kiện cho nút giảm
        decreaseButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const input = quantityInputs[index];
                let currentQuantity = parseInt(input.value) || 1; // Lấy số lượng hiện tại
                if (currentQuantity > 1) { // Không cho phép số lượng nhỏ hơn 1
                    currentQuantity -= 1;
                    input.value = currentQuantity;
                    updateTotalPrice(index, currentQuantity);
                    calculateTotal(); // Cập nhật tổng thanh toán
                }
            });
        });

        // Sự kiện cho nút tăng
        increaseButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const input = quantityInputs[index];
                let currentQuantity = parseInt(input.value) || 1; // Lấy số lượng hiện tại
                currentQuantity += 1;
                input.value = currentQuantity;
                updateTotalPrice(index, currentQuantity);
                calculateTotal(); // Cập nhật tổng thanh toán
            });
        });

        // Cập nhật tổng giá
        function updateTotalPrice(index, quantity) {
            const totalPriceElement = totalPrices[index];
            const totalPrice = unitPrices[index] * quantity;
            totalPriceElement.textContent = `₫${totalPrice.toLocaleString()}`;
        }

        // Kiểm tra đầu vào
        quantityInputs.forEach(input => {
            input.addEventListener('input', function () {
                // Chỉ cho phép số
                this.value = this.value.replace(/[^0-9]/g, '');
                const currentQuantity = parseInt(this.value) || 1; // Nếu không có giá trị, gán về 1
                const index = [...quantityInputs].indexOf(this);
                updateTotalPrice(index, currentQuantity);
                calculateTotal(); // Cập nhật tổng thanh toán
            });
        });

        // Tính toán tổng thanh toán khi tải trang
        window.onload = calculateTotal;
