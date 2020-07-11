pipeline {
    agent {
        docker {
        	image 'node'
        	args '-u 0 --entrypoint=""'
        }
    }
    triggers{ cron('H/15 H(9-16) * * 1-5') }
    stages {
        stage ('checkout'){
          steps{
            checkout scm
            sh 'apt-get update'
            sh 'apt install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget'
          }
        }
        stage("Env Variables") {
            steps {
                //sh "printenv"
                echo "The build number is ${env.BUILD_NUMBER}"
                echo "You can also use \${BUILD_NUMBER} -> ${BUILD_NUMBER}"
                sh 'echo "I can access $BUILD_NUMBER in shell command as well."'
            }
        }
        stage('Test/Coverage') {
            steps {
                sh 'npm ci'
                sh 'npm rebuild'
                sh 'npm install'
                sh 'npm run-script test:pup'
                publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'coverage/factor', reportFiles: 'index.html', reportName: 'HTML Cov Report', reportTitles: ''])
            }
        }
        stage('Build') {
            steps {
                sh 'npm run-script build:i18n --prod --build-optimizer'
            }
        }
        //stage('Publish') {
            //steps {
                //steps {
                    //withDockerRegistry([ credentialsId: "6544de7e-17a4-4576-9b9b-e86bc1e4f903", url: "" ]) {
                        //sh 'docker push brightbox/terraform:latest'
                        //sh 'docker push brightbox/cli:latest'
                    //}
                //}
            //}
        //}
    }
    //post {
        //always {
            //junit "test-results.xml"
        //}
    //}
}
