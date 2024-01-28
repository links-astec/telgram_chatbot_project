function fetchDataAndRender() {
    fetch('http://localhost:5000/api/files/getfiles')
        .then(response => response.json())
        .then(data => {
            const mainContent = document.getElementById('mainContent');
            const fileContainerTemplate = document.getElementById('fileContainerTemplate');

            data.forEach(file => {
                // Clone the template
                const fileContainer = fileContainerTemplate.cloneNode(true);
                // Display the template (remove "style" attribute)
                fileContainer.removeAttribute('style');
                const fileNameWithoutExtension = file.file_name.replace(/\.[^/.]+$/, '');
                // Set content based on file data
                fileContainer.querySelector('.filename').textContent = fileNameWithoutExtension;
                fileContainer.querySelector('.file-type').textContent = file.file_type;
                fileContainer.querySelector('.level').textContent = `${file.level}`;
                const filePath = `http://localhost:5000/${file.file_path.replace(/\\/g, '/')}`;
                fileContainer.querySelector('.link-download').href = filePath;
                fileContainer.querySelector('.link-download').download = file.file_name;

                // Add event listener for the delete button
                const deleteButton = fileContainer.querySelector('.delete-file-btn');
                deleteButton.addEventListener('click', function (event) {
                    event.preventDefault();
                    deleteFile(file.file_id); // Call the deleteFile function with the file ID
                });

                // Append the file container to the main content
                mainContent.appendChild(fileContainer);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

function deleteFile(fileId) {
    fetch(`http://localhost:5000/api/files/delete/${fileId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        // Handle success or display a message
        console.log('File deleted successfully:', data);

        // Wait for the deletion process to complete before updating the UI
        fetchDataAndRender();
    })
    .catch(error => {
        console.error('Error deleting file:', error);
        // Handle error or display an error message
    });
}

// Call the function when the DOM is ready
document.addEventListener('DOMContentLoaded', fetchDataAndRender);
