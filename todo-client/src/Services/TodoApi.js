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

// function to update todo 


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