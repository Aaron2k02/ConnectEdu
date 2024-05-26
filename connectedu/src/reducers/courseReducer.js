// Initial State
export const INITIAL_STATE = {
    userId: JSON.parse(localStorage.getItem("currentUser"))?._id,
    title: "",
    category: "",
    thumbnailUrl: [],
    description: "",
    shortTitle: "",
    courseDuration: 1,
    topics: [{ coverage: "" }],
    price: 1,
    adminFeedback: "No feedback available",
    courseContent: [],
    sections: [], // Add sections field to the initial state
};

// Reducer function
export const courseReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_INPUT":
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            };
        case "ADD_IMAGES":
            return {
                ...state,
                thumbnailUrl: action.payload.thumbnailUrl,
            };
        case "ADD_TOPIC":
            return {
                ...state,
                topics: [...state.topics, { coverage: "" }],
            };
        case "REMOVE_TOPIC":
            return {
                ...state,
                topics: state.topics.filter((_, index) => index !== action.payload),
            };
        case "CHANGE_TOPIC":
            return {
                ...state,
                topics: state.topics.map((topic, index) =>
                    index === action.payload.index ? { coverage: action.payload.value } : topic
                ),
            };
        case "ADD_SECTION":
            return {
                ...state,
                sections: [...state.sections, action.payload],
            };
        case "REMOVE_SECTION":
            return {
                ...state,
                sections: state.sections.filter((_, index) => index !== action.payload),
            };
        case "ADD_COURSE_CONTENT":
            return {
                ...state,
                sections: action.payload, // Ensure payload is an array of sections
            };
        case 'SET_STATE':
            return {
                ...state,
                ...action.payload
            };
        case "SET_THUMBNAIL_URL":
            return {
                ...state,
                thumbnailUrl: action.payload,
            };
        default:
            return state;
    }
};
