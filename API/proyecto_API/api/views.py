import json
from django.http.response import JsonResponse
from django.views import View
from .models import User
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.
class UsersView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, email=''):

        if(len(email)>0):
            users=list(User.objects.filter(email=email).values()) 

            if(len(users)>0):
                user = users[0]
                datos = {'messages': "Success", 'user': user}
            else:
                datos = {'messages': "User not found..."}

            return JsonResponse(datos)
        else:
            users=list(User.objects.values())

            if(len(users)>0):
                datos = {'messages': "Success", 'users': users}
            else:
                datos = {'messages': "Users not found..."}

            return JsonResponse(datos)

    def post(self, request):
        jd = json.loads(request.body)
        User.objects.create(email = jd['email'], password = jd['password'])
        datos = {'messages': "Success"}
        return JsonResponse(datos)

    def put(self, request, email):
        jd = json.loads(request.body)
        users=list(User.objects.filter(email=email).values()) 
        if(len(users)>0):
            user = User.objects.get(email=email)
            user.email = jd['email']
            user.password = jd['password']
            user.save()
            datos = {'messages': "Success"}
        else:
            datos = {'messages': "User not found..."}

        return JsonResponse(datos)

    def delete(self, request, email):
        users=list(User.objects.filter(email=email).values())
        
        if(len(users)>0):
            User.objects.filter(email=email).delete()
            datos = {'messages': "Success"}
        else:
            datos = {'messages': "User not found..."}
        
        return JsonResponse(datos)