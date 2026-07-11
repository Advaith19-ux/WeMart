
// export async function addToCart(asin, quantity = 1) {
//   const token = localStorage.getItem("access_token");

//   return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({
//       asin,
//       quantity,
//     }),
//   });
// }


export async function getCart() {
  const token = localStorage.getItem("access_token");

  return fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function addToCart(asin, quantity = 1) {
  const token = localStorage.getItem("access_token");

  return fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        asin,
        quantity,
      }),
    }
  );
}

export async function updateCart(id, quantity) {
  const token = localStorage.getItem("access_token");

  return fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        quantity,
      }),
    }
  );
}

export async function removeFromCart(id) {
  const token = localStorage.getItem("access_token");

  return fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}