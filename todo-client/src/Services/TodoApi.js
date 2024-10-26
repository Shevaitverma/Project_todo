// function to fetch todo data 
const fetchTodos = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:4001/api/todos", {
            headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        const data = await response.json();
        return data.data 
    } catch (error) {
        throw new Error("Failed to fetch the data")
    }
}

// function to update/edit todo
export const editTodo = async (id, updatedData) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:4001/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error("Failed to update todo");
    }
    return await response.json();
  };
  


// Function to delete todo 
const deleteTodo = async(id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:4001/api/todos/${id}`,{
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })

        if(!response.ok){
            throw new Error("Error while getting response")
        }

    } catch (error) {
        throw new Error("Todo not deleted: ", console.error)
    }
}

export {
    fetchTodos,
    deleteTodo
}