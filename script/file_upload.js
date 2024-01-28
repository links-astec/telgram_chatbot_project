// Define the function to handle the form submission
function uploadFile(event) {
    console.log('Form submitted!');
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(document.getElementById('fileUploadForm'));
    const userId = localStorage.getItem('userId');
    formData.set('file_type', document.querySelector('input[name="file_type"]:checked').value);
    
    // Set the file_name to the actual file name
    formData.set('file_name', fileInput.files[0].name,);
    formData.set('user_id', userId);

    // Send a POST request to your API endpoint
    fetch('http://localhost:5000/api/files/upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log('File uploaded successfully:', data);
        // Handle success, e.g., close the modal or show a success message
        $('#uploadModal').modal('hide'); // Assuming you are using jQuery for modal
    })
    .catch(error => {
        console.error('Error uploading file:', error);
        // Handle error, e.g., show an error message to the user
    });
}
