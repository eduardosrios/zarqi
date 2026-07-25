# Security Policy

## Supported Versions

This project is currently in initial setup. Security review applies to the active default branch unless the owner states otherwise.

## Reporting a Vulnerability

If you discover a security issue, do not open a public issue with exploit details.

Report the issue privately to the repository owner through the available GitHub profile or repository contact channel. Include:

- A short description of the issue.
- Steps to reproduce it.
- Affected files or functionality.
- Potential impact.
- Suggested remediation, if known.


## Static Website Review Notes

Because zarqi is a static HTML, CSS, and JavaScript template, security review should prioritize:

- Third-party vendor files committed under `template/assets/vendor/`.
- External media URLs used by the template.
- Form markup and client-side validation behavior.
- Links that open new tabs or external resources.
- Any future deployment configuration added to the repository.
## Scope

Security reports should focus on the website source code, static assets, configuration files, third-party libraries, and deployment-related files that are part of this repository.

