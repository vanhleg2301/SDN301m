const tutorials = [
    {
        'id': 1,
        'title': 'Digital Transformation - Chuyển Đổi Số',
        'author': 'Lindsay Herbert',
        'images': [
            { 'id': 1, 'url': '/1.png', 'caption': 'Digital Transformation' },
            { 'id': 2, 'url': '/2.png', 'caption': 'Digital Transformation 1' },
            { 'id': 3, 'url': '/3.png', 'caption': 'Digital Transformation 2' }
        ],
        'comments': [1, 2, 3],
        'category': 1
    },
    {
        'id': 2,
        'title': 'Big Data - Dữ Liệu Lớn',
        'author': 'Lars Rinnan',
        'images': [
            { 'id': 4, 'url': '/4.png', 'caption': 'Big Data' },
            { 'id': 5, 'url': '/5.png', 'caption': 'Big Data 1' },
            { 'id': 6, 'url': '/6.png', 'caption': 'Big Data 2' }
        ],
        'comments': [4, 5, 6, 7],
        'category': 2
    },
    {
        'id': 3,
        'title': 'Cuộc Cách Mạng Blockchain',
        'author': 'Don & Alex Tapscott',
        'images': [
            { 'id': 7, 'url': '/7.png', 'caption': 'Cuộc Cách Mạng Blockchain' },
            { 'id': 8, 'url': '/8.png', 'caption': 'Cuộc Cách Mạng Blockchain 1' },
            { 'id': 9, 'url': '/9.png', 'caption': 'Cuộc Cách Mạng Blockchain 2' }
        ],
        'comments': [8, 9],
        'category': 1
    }
]
const getAllTutorials = async (req, res) => {
    const numberOfTutorials = tutorials.length;
    try {
        res.status(200).json({
            message: "Get all Tutorials",
            data : tutorials,
            total : numberOfTutorials
        });
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
    }
};
function getTutorialsByTitle(req, res) {
    const tutorialsTitle = req.params.title;
    if (!tutorialsTitle) {
        res.status(400).send("Title parameter is missing");
        return;
    }
    const tutorial = tutorials.find(item => item.title === tutorialsTitle);

    if (tutorial) {
        res.send(tutorial);
    } else {
        res.status(404).send({
            message:`Title '${ tutorialsTitle}' not found`});
    }
}
function addTutorial(req, res) {
    const newTutorial = req.body;
    if (!newTutorial || Object.keys(newTutorial).length === 0) {
        return res.status(400).json({ error: "Request body is missing or empty" });
    }
    if (!newTutorial.title || !newTutorial.author) {
        return res.status(400).json({ error: "Invalid tutorial data" });
    }

    const existingTutorial = tutorials.find(item => item.title === newTutorial.title);

    if (existingTutorial) {
        return res.status(409).json({ error: "Tutorial with the same title already exists" });
    }
    const newId = tutorials.length + 1;
    newTutorial.id = newId;

    tutorials.push(newTutorial);
    res.status(201).json(newTutorial);
}




export default {getAllTutorials,getTutorialsByTitle,addTutorial}

