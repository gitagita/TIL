

/**
 * Displays a dropdown with available tags that match the input value.
 * If no matching tags are found, shows an option to create a new tag.
 * 
 * @param {HTMLInputElement} input - The input element where the user types the tag.
 */
function showDropdown(input) {}

/**
 * Selects a tag from the dropdown and adds it to the tag container.
 * 
 * @param {HTMLElement} element - The dropdown option element that was clicked.
 */
function selectTag(element) {}

/**
 * Creates a new tag and adds it to the available tags and the tag container.
 * 
 * @param {string} tagText - The text of the new tag to be created.
 * @param {HTMLInputElement} input - The input element where the user typed the new tag.
 */
function createTag(tagText, input) {}

/**
 * Adds a tag to the tag container.
 * 
 * @param {string} tagText - The text of the tag to be added.
 * @param {HTMLElement} tagContainer - The container element where the tag will be added.
 */
function addTagToContainer(tagText, tagContainer) {}

/**
 * Removes a tag from the tag container.
 * 
 * @param {HTMLElement} element - The span element inside the tag that was clicked to remove the tag.
 */
function removeTag(element) {}

/**
 * Handles the Enter key press event on the input element.
 * If the input value is a new tag, creates it. If it matches an existing tag, selects it.
 * 
 * @param {KeyboardEvent} event - The key press event.
 * @param {HTMLInputElement} input - The input element where the user types the tag.
 */
function handleEnter(event, input) {}

/**
 * Hides all tag dropdowns when clicking outside of them.
 * 
 * @param {MouseEvent} event - The click event.
 */
document.addEventListener('click', function (event) {});

// Available tags
let availableTags = ["test", "test2"];

function showDropdown(input) {
    const dropdown = input.nextElementSibling;
    const filter = input.value.toLowerCase();
    dropdown.innerHTML = ''; // Clear the dropdown

    let tagExists = false;

    // Populate the dropdown with matching tags
    availableTags.forEach(tag => {
        if (tag.toLowerCase().includes(filter)) {
            const option = document.createElement('div');
            option.textContent = tag;
            option.onclick = function() { selectTag(option); };
            dropdown.appendChild(option);
            tagExists = true;
        }
    });

    // If no tag exists, show "생성" option
    if (!tagExists && filter) {
        const createOption = document.createElement('div');
        createOption.textContent = `생성 ${filter}`;
        createOption.onclick = function() { createTag(filter, input); };
        dropdown.appendChild(createOption);
    }

    dropdown.style.display = filter ? "block" : "none";
}

function selectTag(element) {
    const tagText = element.textContent.trim();
    const td = element.closest('td'); // Get the <td> that contains the dropdown

    // Check if tag-container exists in the <td>, create it if it doesn't exist
    let tagContainer = td.querySelector('.tag-container');
    if (!tagContainer) {
        tagContainer = document.createElement('div');
        tagContainer.className = 'tag-container';
        td.appendChild(tagContainer); // Append tag-container to <td>
    }

    // Check if the tag already exists in the tag container
    const existingTags = tagContainer.getElementsByClassName('tag');
    for (let i = 0; i < existingTags.length; i++) {
        if (existingTags[i].textContent.trim().startsWith(tagText)) {
            // Tag already exists, do not add it
            return;
        }
    }

    // Add the tag to the tag container
    addTagToContainer(tagText, tagContainer);

    // Hide the dropdown after selection
    element.closest('.tag-dropdown').style.display = 'none';
}

function createTag(tagText, input) {
    availableTags.push(tagText); // Add the new tag to available tags

    const td = input.closest('td');
    let tagContainer = td.querySelector('.tag-container');

    // Create a tag container if it doesn't exist
    if (!tagContainer) {
        tagContainer = document.createElement('div');
        tagContainer.className = 'tag-container';
        td.appendChild(tagContainer);
    }

    // Check if the new tag already exists in the tag container
    const existingTags = tagContainer.getElementsByClassName('tag');
    for (let i = 0; i < existingTags.length; i++) {
        if (existingTags[i].textContent.trim().startsWith(tagText)) {
            return; // Tag already exists, do not add
        }
    }

    // Add the new tag to the tag container
    addTagToContainer(tagText, tagContainer);

    // Clear the input and hide the dropdown
    input.value = '';
    input.nextElementSibling.style.display = 'none';
}

function addTagToContainer(tagText, tagContainer) {
    const newTag = document.createElement('div');
    newTag.className = 'tag';
    newTag.innerHTML = `${tagText} <span class="remove-tag" onclick="removeTag(this)">x</span>`;
    tagContainer.appendChild(newTag);
}

function removeTag(element) {
    const tag = element.parentElement; // Get the parent <div> (the tag)
    tag.remove(); // Remove the tag
}

function handleEnter(event, input) {
    if (event.key === 'Enter') {
        const tagText = input.value.trim();
        if (tagText && !availableTags.includes(tagText)) {
            createTag(tagText, input);
        } else {
            // If tag exists, add it directly
            const dropdown = input.nextElementSibling;
            const matchingTag = Array.from(dropdown.children).find(div => div.textContent === tagText);
            if (matchingTag) {
                selectTag(matchingTag);
            }
        }
    }
}

document.addEventListener('click', function (event) {
    if (!event.target.matches('.tag-select input')) {
        const dropdowns = document.getElementsByClassName("tag-dropdown");
        for (let i = 0; i < dropdowns.length; i++) {
            dropdowns[i].style.display = "none";
        }
    }
});