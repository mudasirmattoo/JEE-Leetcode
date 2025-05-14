# start-supabase.ps1

function Wait-For-Port {
    param([int]$port)

    Write-Host "Checking if port $port is available..."

    while ($(netstat -aon | Select-String ":$port" | Select-String "TIME_WAIT")) {
        Write-Host "Port $port is in TIME_WAIT. Waiting..."
        Start-Sleep -Seconds 2
    }

    Write-Host "Port $port is free. Starting Supabase..."
}

# We now bind to 54324 externally (avoiding 54322 conflicts)
Wait-For-Port -port 54324

docker run --rm -it `
  -v ${PWD}:/app `
  -v //var/run/docker.sock:/var/run/docker.sock `
  -w /app `
  -p 54321:54321 -p 54324:54322 `
  treyenelson/supabase-cli supabase start
