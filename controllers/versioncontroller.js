const Version = require('../models/version'); // Adjust path as needed

// Function to get all versions
async function getAllVersions() {
    try {
        const versions = await Version.find(); // Retrieves all documents in the `versions` collection
        console.log(versions); // Log or process versions as needed
        return versions;
    } catch (error) {
        console.error('Error fetching versions:', error);
        throw error;
    }
}

// Example function to find a specific version by name
async function findVersionByName(name) {
    try {
        const version = await Version.findOne({ name });
        return version;
    } catch (error) {
        console.error('Error finding version:', error);
        throw error;
    }
}

// Export functions if you need them elsewhere
module.exports = { getAllVersions, findVersionByName };
