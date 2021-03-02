from django.shortcuts import render
from django.http import HttpResponse
import json

# Create your views here.

def index(request):

    context = {
        'errors'    : [],
        'tasks'     : [],
    }

    try:
        context['tasks'] = json.dumps(request.session['tasks'])
        print(context['tasks'])
    except:
        pass

    return render(request, 'todo/index.html', context)

def update_session(request):
    if request.method == "POST":
        items = request.POST.items()
        HttpResponse.status_code = 201

        for key, value in items:
            if key != 'csrfmiddlewaretoken':
                tasks = value

        request.session['tasks'] = tasks

        return HttpResponse()


def reset_session(request):
    request.session.clear()
    return HttpResponse()