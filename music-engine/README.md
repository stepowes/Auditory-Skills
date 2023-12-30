# music-engine

~~ABOUT~~
This repository is the back-end for the auditory training web application. This repository contains the logic for the application, the database, and the engines that will train and deploy machine learning models.


~~SETTING UP VIRTUAL ENVIRONMENT FOR BACKEND~~
Please make sure you have anaconda navigator and miniconda terminal installed on your system. If you do not already have these technologies, they will surely be used in the future in many other projects; they are package managers.

1. Launch your miniconda prompt
2. Use the following command to create a new Conda environment 
    conda create --name <environment_name> python=3.10
3. Now use the following command to activate the virutal environment. You will need to do this everytime you update any packages in your virtual environment.
    conda activate <environment_name>
4. Refer to the 'requirements.txt' file in this repo and run this command on each of the dependecies listed in that file.
    pip install <package_name> 
5. Please use this command to verify that your updates have been made.
    conda list
6. When you are done working in the environment please don't forget to use this command to deactivate it.
    conda deactivate

~~USING YOUR VIRTUAL ENVIRONMENT~~ 
When working with a python file, if you are using VSC you can see when you have a python file open the interpreter it is using 
for the python code at the bottom right of VSC. There, you can simply click the interpreter and a list will pop up at the top. 
This is where you can switch to use the conda environment that you have configured for your use of python in this code.

Without being in a python file however, check if you can run the command 'conda --version'.
If you can run it great!
However, if your powershell mentions that it doesn't know of the command conda, you must add conda to your PATH variable.
If you have this issue please reference the OneNote file called "conda PATH Varaible setup". 

To use your conda environment in your powershell embedded in VSC, just activate the conda environment via:
    conda activate <environment-name>
Doing this will allow you to utilize the packages that you have downloaded to that conda environment.


