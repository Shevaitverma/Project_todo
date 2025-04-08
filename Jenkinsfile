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
