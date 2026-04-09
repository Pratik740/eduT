const db = require('../config/db');
const { z } = require('zod');
const { calculateDistance } = require('../utils/distance');

// Validation schema for addSchool
const addSchoolSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  address: z.string().min(1, "Address is required").trim(),
  latitude: z.number({ required_error: "Latitude is required", invalid_type_error: "Latitude must be a number" }).min(-90).max(90),
  longitude: z.number({ required_error: "Longitude is required", invalid_type_error: "Longitude must be a number" }).min(-180).max(180)
});

exports.addSchool = async (req, res) => {
    try {
        // Validate payload
        const validatedData = addSchoolSchema.parse(req.body);
        
        const { name, address, latitude, longitude } = validatedData;
        
        // Insert into database
        const [result] = await db.execute(
            'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
            [name, address, latitude, longitude]
        );
        
        res.status(201).json({
            message: 'School successfully added',
            schoolId: result.insertId
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ 
                error: 'Validation failed', 
                details: error.errors.map(err => err.message) 
            });
        }
        console.error("Error adding school:", error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.listSchools = async (req, res) => {
    try {
        // Using query parameters for GET request, so they are strings.
        // We parse them into floats.
        const userLat = parseFloat(req.query.latitude);
        const userLon = parseFloat(req.query.longitude);
        
        if (isNaN(userLat) || isNaN(userLon)) {
            return res.status(400).json({ error: 'Valid latitude and longitude query parameters are required' });
        }

        // Fetch all schools
        const [schools] = await db.execute('SELECT * FROM schools');
        
        // Calculate distance for each school
        const schoolsWithDistance = schools.map(school => {
            const distance = calculateDistance(userLat, userLon, school.latitude, school.longitude);
            return {
                ...school,
                distance
            };
        });

        // Sort by distance (proximity)
        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.status(200).json(schoolsWithDistance);
    } catch (error) {
        console.error("Error listing schools:", error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
