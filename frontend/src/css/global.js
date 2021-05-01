import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
body {
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
}

input, .App-post {
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
}

a {
  color: ${({ theme }) => theme.primary};
}

.App-logo svg path {
  fill: ${({ theme }) => theme.text};
}

.App-border,
.App-comments {
  border: 1px solid ${({ theme }) => theme.border};

}

.App-btn-primary {
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
}

.App-btn-secondary {
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
}

.App-modal {
  background: ${({ theme }) => theme.bg};
}

.App-PM {
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.bg};

}

.App-menu li a span svg path,
.App-menu li button svg path
{
  fill: ${({ theme }) => theme.primary};
}
.App-btn-icon-mini svg path {
  fill: ${({ theme }) => theme.text};
}
.App-btn-icon svg path {
  fill: ${({ theme }) => theme.text};

}
.App-btn-icon span {
  color: ${({ theme }) => theme.text};
}

.App-tab-links.active {
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.primary};
}

.App-comments-owner {
  background: ${({ theme }) => theme.myComment};
}

.App-menu li a,
.App-menu li button {
  color: ${({ theme }) => theme.primary};
}
.App-menu-login svg path {
  fill: ${({ theme }) => theme.primary};
}

th, button {
  color: ${({ theme }) => theme.bg};
  background: ${({ theme }) => theme.text};
}
`;
