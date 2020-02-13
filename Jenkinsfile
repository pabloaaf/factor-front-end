pipeline {
    agent {
        dockerfile true
    }
    stages {
        stage ('checkout'){
          steps{
            checkout scm
          }
        }
        stage('Test/Coverage') {
            steps {
                sh 'RUN npm run-script test'
                publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'coverage', reportFiles: 'index.html', reportName: 'HTML Cov Report', reportTitles: ''])
            }
            post {
                always {
                    junit "test-results.xml"
                }
            }
        }
        stage('Build') {
            steps {
                sh 'RUN npm run-script build:i18n --prod --build-optimizer'
            }
        }
        stage('deploy') {
            steps {
                sh 'echo future'
            }
        }
    }
}