import React, { useEffect } from "react";
import { Result } from "../../Models/Result";
import { votingService } from "../../Services/VotingService/VotingService";

export function RSPContainer() {
  useEffect(() => {
    let initialResults: Result[] = votingService.getInitialSearchPageResults();
    console.log(initialResults);
  }, []);

  return (
    <div>RSP CONTAINER</div>
  );
}