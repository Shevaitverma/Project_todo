pipeline {
    agent any

    triggers {
        githubPush()
    }

    stages {
        stage('pulling repo') {
            steps {
                git 'https://github.com/Shevaitverma/Project_todo.git'
            }
        }
    }
    post {
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed.'
        }
    }
}
