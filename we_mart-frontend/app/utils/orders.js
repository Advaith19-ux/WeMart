const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

function getToken() {
  return localStorage.getItem("access_token");
}

export async function createOrder(paymentMethod) {
  const token = localStorage.getItem("access_token");

  return fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        paymentMethod,
      }),
    }
  );
}

export async function getOrders() {
  return fetch(`${BASE_URL}/api/orders`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export async function getOrder(id) {
  const token = localStorage.getItem("access_token");

  return fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function cancelOrder(id) {
  return fetch(
    `${BASE_URL}/api/orders/cancel/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
}