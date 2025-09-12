from typing import Dict, Any

from authlib.integrations.requests_client import OAuth2Session

from app.core.config import settings


class OAuthService:
    def __init__(self):
        self.providers = {
            'google': {
                'client_id': settings.GOOGLE_CLIENT_ID,
                'client_secret': settings.GOOGLE_CLIENT_SECRET,
                'authorize_url': 'https://accounts.google.com/o/oauth2/auth',
                'access_token_url': 'https://oauth2.googleapis.com/token',
                'scope': ['openid', 'email', 'profile'],
            },
            'github': {
                'client_id': settings.GITHUB_CLIENT_ID,
                'client_secret': settings.GITHUB_CLIENT_SECRET,
                'authorize_url': 'https://github.com/login/oauth/authorize',
                'access_token_url': 'https://github.com/login/oauth/access_token',
                'scope': ['user:email'],
            },
            'linkedin': {
                'client_id': settings.LINKEDIN_CLIENT_ID,
                'client_secret': settings.LINKEDIN_CLIENT_SECRET,
                'authorize_url': 'https://www.linkedin.com/oauth/v2/authorization',
                'access_token_url': 'https://www.linkedin.com/oauth/v2/accessToken',
                'scope': ['r_liteprofile', 'r_emailaddress'],
            }
        }

    def get_authorization_url(self, provider: str, state: str) -> str:
        """Get authorization URL for OAuth"""
        oauth = OAuth2Session(
            client_id=self.providers[provider]['client_id'],
            client_secret=self.providers[provider]['client_secret'],
            scope=self.providers[provider]['scope'],
        )
        authorization_url, _ = oauth.create_authorization_url(
            self.providers[provider]['authorize_url'],
            state=state,
            redirect_uri=f"{settings.FRONTEND_URL}/auth/{provider}/callback"
        )
        return authorization_url

    def get_user_info(self, provider: str, code: str) -> Dict[str, Any]:
        """Exchange code for user info"""
        oauth = OAuth2Session(
            client_id=self.providers[provider]['client_id'],
            client_secret=self.providers[provider]['client_secret'],
            redirect_uri=f"{settings.FRONTEND_URL}/auth/{provider}/callback"
        )
        token = oauth.fetch_token(
            self.providers[provider]['access_token_url'],
            code=code
        )

        if provider == 'google':
            user_info = oauth.get('https://www.googleapis.com/oauth2/v2/userinfo').json()
            return {
                'id': user_info['id'],
                'email': user_info.get('email'),
                'name': user_info.get('name'),
                'avatar': user_info.get('picture'),
            }
        elif provider == 'github':
            user_info = oauth.get('https://api.github.com/user').json()
            email_info = oauth.get('https://api.github.com/user/emails').json()
            primary_email = next((email['email'] for email in email_info if email.get('primary')), None)
            return {
                'id': user_info['id'],
                'email': primary_email or user_info.get('email'),
                'name': user_info.get('name') or user_info.get('login'),
                'avatar': user_info.get('avatar_url'),
            }
        elif provider == 'linkedin':
            user_info = oauth.get('https://api.linkedin.com/v2/people/~').json()
            email_info = oauth.get('https://api.linkedin.com/v2/emailAddresses?q=members&projection=(elements*(handle~))').json()
            # Note: LinkedIn API requires r_emailaddress scope
            return {
                'id': user_info['id'],
                'email': email_info['elements'][0]['handle~']['emailAddress'] if email_info.get('elements') else None,
                'name': f"{user_info.get('firstName', {}).get('localized', {}).get('en_US', '')} {user_info.get('lastName', {}).get('localized', {}).get('en_US', '')}",
                'avatar': None,  # LinkedIn doesn't provide avatar in this endpoint
            }
        else:
            raise ValueError(f"Unsupported provider: {provider}")


oauth_service = OAuthService()
