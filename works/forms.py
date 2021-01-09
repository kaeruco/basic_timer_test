# 以下、アプリ開発練習用

from django import forms
from .models import Sample

class ImgForm(forms.ModelForm):
    class Meta:
        model = Sample
        fields = ('img',)