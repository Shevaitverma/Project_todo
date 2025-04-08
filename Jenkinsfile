pipeline {
    agent any

    triggers {
        githubPush()
    }

    stages {
        stage('Hello') {
            steps {
                echo 'Hello World'
            }
        }
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/your-username/your-repo.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
    }
}
