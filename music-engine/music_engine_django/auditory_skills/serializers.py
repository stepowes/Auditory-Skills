
from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['lastname', 'firstname', 'username', 'age', 'musicalYear', 'email', 'password']
    def create(self, validated_data):
        # Extract and remove the additional field from validated_data
        print(validated_data)
        # confirmedPassword = validated_data.pop('confirmedPassword', None)
        #print(confirmedPassword)
        # print(validated_data['password'])
        # # Perform custom validation logic, for example, check if password matches
        # if 'password' in validated_data and confirmedPassword != validated_data['password']:
        #     raise serializers.ValidationError({'confirmedPassword': 'Passwords do not match'})

        # Call the parent create method to save the user
        user = super().create(validated_data)

        # Set the password using the set_password method to handle hashing
        user.set_password(validated_data['password'])
        user.save()

        return user