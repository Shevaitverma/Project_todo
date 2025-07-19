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
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch todos");
        }
        const data = await response.json();
        return data; // Return the full response object
    } catch (error) {
        throw new Error(error.message || "Failed to fetch the data");
    }
}

// function to update/edit todo
export const editTodo = async (id, updatedData) => {
    try {
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
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to update todo");
        }
        const data = await response.json();
        return data; // Return the full response object
    } catch (error) {
        throw new Error(error.message || "Failed to update todo");
    }
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
            const errorData = await response.json();
            throw new Error(errorData.message || "Error while deleting todo");
        }

        return true; // Return success indicator
    } catch (error) {
        throw new Error(error.message || "Todo not deleted");
    }
}

export {
    fetchTodos,
    deleteTodo
}