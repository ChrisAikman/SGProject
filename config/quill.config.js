/* Config file for the quill text editor. */

module.exports = {
  options: {
    "theme": "snow",
    "placeholder": "Enter your comment...",
    "modules": {
      "toolbar": [
        [{ "size": ["small", false, "large"] }],
        ["bold", "italic", "underline", "strike"],
        [{ "align": [] }],
        ["blockquote", "code-block"],
        [{ "list": "ordered"}, { "list": "bullet" }],
      ]
    }
  }
}
