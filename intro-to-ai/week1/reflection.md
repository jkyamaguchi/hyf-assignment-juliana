## Reflection
### 3 new things you learned from AI in the above task.
1) Create a filter that highlights the buttons when hovered.
2) Put Javascript in a separated file and link it to the html file.
3) Visualize the mobile version in developer mode on browser.

### Where did you have to tweak or correct Copilot’s suggestions to suit your needs?
1) When I wanted a more lighter effect when hover the buttons.
2) I have to tweak manually the padding values in the header to align the text the way I wanted.

### How would you explain the difference between using Copilot to generate code for you vs. using it as an effective learning partner?
Accepting modifications in the code proposed by Copilot is handy, but it can be a big trouble in the future regarding the maintenance of the code when you don't understand what is happening in a specific function or why some values properties should be set as AI suggested. On the other hand, using Copilot as a learning partner is time saving, because you already have the context in the environment and you just have to "chat" about the issues or ask to explain about some concepts. In that way, you can understand better how build the code and solve problems without be an errand in StackOverFlow or vague in to much information in  documentations. 

### Identify 3 risks of relying too much on AI tools when learning at HackYourFuture.
1) I could not learning for real.
2) I could end up in a complex code instead of a simpler, but good solution.
3) I could not fix the code in the future because it was all AI generated and I could not analyze and solve a problem independently.

## Part A: Review and Improve Portfolio
### Refactoring to readability, best practices, potential bugs, and security 
Here are the suggested refactors for both `index.html` and `index.css`, with explanations for each change:

**`index.html`**
1. Fix Duplicate `ul` Attribute
Change:
Replace `<ul ul class="section__ul">` with `<ul class="section__ul">`.

Why:
The duplicate `ul` is a typo and invalid HTML. Removing it ensures proper rendering and avoids potential browser quirks.

2. Add `rel="noopener noreferrer"` to External Links (if any)
Change:
If you add anchor tags for LinkedIn or GitHub, use:
`<a href="..." target="_blank" rel="noopener noreferrer">...</a>`

Why:
This prevents security vulnerabilities when opening links in a new tab, protecting against tab-napping attacks.

3. Use Anchor Tags for Profile Links Instead of Buttons
Change:
Replace the LinkedIn and GitHub buttons with anchor tags that link to your profiles.

Why:
Buttons are for actions, not navigation. Anchor tags are semantically correct for navigation and improve accessibility and SEO.

4. Add alt Texts That Describe the Link Purpose
Change:
Update alt attributes to describe the destination, e.g., `alt="LinkedIn profile"`.

Why:
Improves accessibility for screen readers.


**`index.css`**
1. Remove Invalid `object-fit: fit`;
Change:
Replace object-fit: fit; with a valid value or remove it.

Why:
fit is not a valid value for `object-fit`. Use `cover`, `contain`, or remove if not needed.

2. Use `line-height: 1.5` for Readability
Change:
Change `line-height: 1;` in `body` to `line-height: 1.5;`.

Why:
Improves text readability and accessibility.

3. Remove Redundant or Unused Selectors
Change:
Remove `.nav-list` selector if not used in HTML.

Why:
Keeps CSS clean and maintainable.

4. Add Focus Styles for Accessibility
Change:
Add a visible focus style for `.header__button:focus`.

Why:
Improves keyboard navigation and accessibility.

5. Use More Specific Color Variables for Accessibility
Change:
Consider using higher contrast for text and background colors.

Why:
Improves accessibility for users with visual impairments.

6. Fix Typo in `.section__ul li` (text-indent)
Change:
Check if `text-indent: -1rem;` is needed; if not, remove or adjust for better list alignment.

Why:
Negative text-indent can cause readability issues.

### Structure

hyf-assignment-juliana/
|
|-- intro-to-ai/
|    |
|    |-- week1/
|         |-- index.html      (Main homepage)
|         |-- index.css       (Styles for homepage)
|         |-- script.js       (Color scheme script)
|         |-- images/
|              |-- linkedin.svg
|              |-- github.svg
|              |-- palette.svg

### Reflect on learnings

1. **First ask, then apply changes**
    Prompting for first explain what should be changed in the code helps to understand better the applied modifications.

2. **Learning best practices**
    AI helps to improve the code following best practices, like `rel="noopener noreferrer"` to External Links to prevent security vulnerabilities.

3. **Remember accessibility**
    AI assists to improve accessibility, for example, `alt` for images, and adjustment in styles for readability.

## Part B: Ethics and Risks 

Ethical issues or risks associated with the use of AI in development

1. **Accuracy and hallucinations**
    AI can made up some APIs, or produce incorrect code. Using Ask mode is a way to avoid inserting piece of code that doesn't work.

2. **Security vulnerabilities**
    The code generated by AI should be reviewed to prevent insertion of security flaws like SQL injection or innerHTML. AI can be used to help mitigating these flaws.

3. **Confidential code and data**
    It's important to be aware to not paste proprietary code or internal data to public AI tools. Sometimes it's better reading documentation for solving problems.