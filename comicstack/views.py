from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def api_root(request):

    base_url = 'http://127.0.0.1:8000/api/'

    return Response({
        'Comics': f'{base_url}comics/',
        'Users': f'{base_url}profiles/',
        'Reviews': f'{base_url}reviews/',
        'Threads': f'{base_url}threads/',
        'Login': f'{base_url}auth/login/',
        'Register': f'{base_url}auth/register/'
    })