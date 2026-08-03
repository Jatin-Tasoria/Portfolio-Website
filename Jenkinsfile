pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                rm -rf /var/www/mywebsite/*
                cp -r dist/* /var/www/mywebsite/
                sudo systemctl reload nginx
                '''
            }
        }
    }
}