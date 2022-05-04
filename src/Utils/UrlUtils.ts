class UrlUtils {
  private PARAM_KEYS = {
    QUESTION_ID: "p",
    ONE_TIME_CODE: "c",
  }

  private getUrlParameter(param: string): string {
    const queryString: string = window.location.search;
    const urlSearchParams = new URLSearchParams(queryString);
    const urlParam = urlSearchParams.get(param);
    return (urlParam === null) ? "" : urlParam;
  }

  public getQuestionId(): string {
    return this.getUrlParameter(this.PARAM_KEYS.QUESTION_ID);
  };

  getOneTimeCode() {
    return this.getUrlParameter(this.PARAM_KEYS.ONE_TIME_CODE);
  }
};

export const urlUtils = new UrlUtils();